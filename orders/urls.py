from django.urls import path, include
from . import views

urlpatterns = [
    path('place-order/', views.place_order, name='place_order')
]