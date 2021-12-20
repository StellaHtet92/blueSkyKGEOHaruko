"""blueSky URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from shp.views import index,indexThai,downloadsEnglish,downloadsThai,aboutUsThai,aboutUsEng,downloadsTest
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index,name='index'),
    path('indexThai', indexThai,name='indexThai'),
    path('aboutUsThai',aboutUsThai,name='aboutUsThai'),
    path('aboutUsEng',aboutUsEng,name='aboutUsEng'),
    path('downloadsEnglish',downloadsEnglish,name='downloadsEnglish'),
    path('downloadsThai',downloadsThai,name='downloadsThai'),
     path('downloadsTest',downloadsTest,name='downloadsTest')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
