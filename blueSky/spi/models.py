from django.db import models
import datetime
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
import geopandas as gpd
import os
import glob
import zipfile
from sqlalchemy import *
from geo.Geoserver import Geoserver
from geo.Postgres import Db
from django.core.validators import FileExtensionValidator

# initializing the library
geo = Geoserver('http://127.0.0.1:8080/geoserver',
                username='admin', password='geoserver')


# The SPI model
class SPI(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000, blank=True)
    file = models.FileField(upload_to='%Y/%m/%d',validators=[FileExtensionValidator(allowed_extensions=['tif'])])
    uploaded_date = models.DateField(default=datetime.date.today, blank=True)

    def __str__(self):
        return self.name

@receiver(post_save, sender=SPI)
def publish_data(sender, instance, created, **kwargs):
    file = instance.file.path
    file_format = os.path.basename(file).split('.')[-1]
    file_name = os.path.basename(file).split('.')[0]
    file_path = os.path.dirname(file)
    name = instance.name

    '''
    Publish SPI geotiff file to geoserver using geoserver-rest
    '''
    '''
    geo.create_featurestore(store_name='KGEO',workspace='blueSky',db='postgres',host='localhost',pg_user='postgres',pg_password='admin')
    geo.publish_featurestore(workspace='blueSky',store_name='SPI',pg_table='');
    '''
    geo.create_coveragestore(file, workspace='blueSky', layer_name=name)
    geo.create_coveragestyle(file, style_name=name, workspace='blueSky')
    geo.publish_style(layer_name=name, style_name=name, workspace='blueSky')


@receiver(post_delete, sender=SPI)
def delete_data(sender, instance, **kwargs):
    geo.delete_layer(instance.name, 'blueSky')
