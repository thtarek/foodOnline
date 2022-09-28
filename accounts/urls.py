from django.urls import path
from . import views

urlpatterns = [
    path('register-user/', views.registerUser, name='register-user'),
    path('vendor-register/', views.registerVendor, name='vendor-register'),
]