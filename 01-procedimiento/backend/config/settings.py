"""Configuración local del laboratorio 10; no es una configuración de producción."""
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'clave-local-publica-del-laboratorio-no-usar-en-produccion'
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'testserver']
INSTALLED_APPS = ['corsheaders', 'productos']
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]
# Nombre vigente de CORS_ORIGIN_ALLOW_ALL mostrado en la guía.
# Se habilitan todos los orígenes únicamente para esta práctica local.
CORS_ALLOW_ALL_ORIGINS = True
ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'
DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': BASE_DIR / 'db.sqlite3'}}
LANGUAGE_CODE = 'es-pe'
TIME_ZONE = 'America/Lima'
USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
