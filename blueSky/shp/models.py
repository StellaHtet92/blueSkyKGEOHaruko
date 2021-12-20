from django.db import models
import datetime
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
import geopandas as gpd
import os
import glob
import zipfile
from sqlalchemy import *
from geoalchemy2 import Geometry, WKTElement
from geo.Geoserver import Geoserver
from geo.Postgres import Db
import psycopg2
#from pyproj import CRS
from django.core.validators import FileExtensionValidator


# initializing the library
db = Db(dbname='blueSky', user='postgres',
        password='admin', host='localhost', port='5432')
geo = Geoserver('http://127.0.0.1:8080/geoserver',
                username='admin', password='geoserver')
# The shapefile model
class Shp(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000, blank=True)
    file = models.FileField(upload_to='%Y/%m/%d',validators=[FileExtensionValidator(allowed_extensions=['zip','rar'])])
    uploaded_date = models.DateField(default=datetime.date.today, blank=True)

    def __str__(self):
        return self.name


@receiver(post_save, sender=Shp)
def publish_data(sender, instance, created, **kwargs):
    file=instance.file.path
    file_format=os.path.basename(file).split('.')[-1]
    file_name=os.path.basename(file).split('.')[0]
    file_path=os.path.dirname(file)
    name = instance.name
    conn_str='postgresql://postgres:admin@localhost:5432/blueSky'
    engine = create_engine(conn_str) 

    print('File:',file)
    print('File_Name:',file_name)
    print('File_Path:',file_path)

    #extract zipfile
    with zipfile.ZipFile(file,'r') as zip_ref:
        zip_ref.extractall(file_path)

    os.remove(file)#remove zip file
    shp = glob.glob(r'{}/**/*.shp'.format(file_path),recursive=True) #to get shp
    print('shp:',shp)
   
    try:
        req_shp = shp[0]
        gdf = gpd.read_file(req_shp)  # make geodataframe
        print('gdf:', gdf)
        gdf.to_postgis(
                    con=engine,
                    schema='data',
                    name=name,
                    if_exists="replace")

        for s in shp:
            os.remove(s)
        
    except Exception as e:
        for s in shp:
           os.remove(s)
        
        instance.delete()
        print("There is problem during shp upload: ", e)
        
        
    '''
    Publish shp to geoserver using geoserver-rest
    '''
    geo.create_featurestore(store_name='blueSky', workspace='blueSky', db='blueSky',
                            host='localhost', pg_user='postgres', pg_password='root', schema='data')
    geo.publish_featurestore(
        workspace='blueSky', store_name='blueSky', pg_table=name)

    geo.create_outline_featurestyle('burrium_suitable_sld', workspace='blueSky')

    geo.publish_style(layer_name=name, style_name='burrium_suitable_sld', workspace='blueSky')


   
@receiver(post_delete, sender=Shp)
def delete_data(sender, instance, **kwargs):
    db.delete_table(table_name=instance.name, schema='data')
    geo.delete_layer(instance.name, 'blueSky')
