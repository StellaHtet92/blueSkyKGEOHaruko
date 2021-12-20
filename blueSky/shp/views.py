from django.shortcuts import render
from django.conf import settings
from django.templatetags.static import static
import os
from .models import Shp
from spi.models import SPI
from map.models import Map

# Create your views here.
def index(request):
    shp = Shp.objects.all()
    spi = SPI.objects.all()
    map=Map.objects.all()
    return render(request,'index.html',{'Shp':shp,'SPI':spi})

def indexThai(request):
    shp = Shp.objects.all()
    spi = SPI.objects.all()
    map=Map.objects.all()
    return render(request,"indexThai.html",{'Shp':shp,'SPI':spi})


def aboutUsThai(request):
    return render(request,"aboutUsThai.html")

def aboutUsEng(request):
    return render(request,"aboutUsEng.html")

def downloadsEnglish(request):
    shp = Shp.objects.all()
    spi = SPI.objects.all()
    map=Map.objects.all()
    path = settings.MEDIA_ROOT
    img_list = os.listdir(path + '/Map/')
    context = {'images' : img_list}
    return render(request,"downloadsEnglish.html",context)

def downloadsThai(request):
    shp = Shp.objects.all()
    spi = SPI.objects.all()
    map=Map.objects.all()
    path = settings.MEDIA_ROOT
    img_list = os.listdir(path + '/Map/')
    context = {'images' : img_list}
    return render(request,"downloadsThai.html",context)

def downloadsTest(request):
    shp = Shp.objects.all()
    spi = SPI.objects.all()
    map=Map.objects.all()
    path = settings.MEDIA_ROOT
    img_list = os.listdir(path + '/Map/')
    context = {'images' : img_list}
    return render(request,"downloadsTest.html",context)