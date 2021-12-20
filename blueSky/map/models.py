from django.db import models
import datetime
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
import os
import zipfile
from sqlalchemy import *
from django.conf import settings
from geo.Postgres import Db
from django.core.validators import FileExtensionValidator

# initializing the library
db = Db(dbname='blueSky', user='postgres',
        password='admin', host='localhost', port='5432')


# The Map model
class Map(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000, blank=True)
    #photo = models.ImageField(upload_to='Map/%Y/%m/%d')
    photo = models.ImageField(upload_to='Map',validators=[FileExtensionValidator(allowed_extensions=['png','jpeg','jpg'])])
    uploaded_date = models.DateField(default=datetime.date.today, blank=True)
    
    def __str__(self):
        return '{} {} {}'.format(self.name,self.description,self.photo)

@receiver(post_delete, sender=Map)
def delete_data(sender, instance, **kwargs):
    instance.photo.delete(False)
