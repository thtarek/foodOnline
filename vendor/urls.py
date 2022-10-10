from django.urls import path, include
from . import views
from accounts import views as AccountViews
urlpatterns = [
    path('', AccountViews.vendorDashboard, name='vendor'),
    path('profile/', views.vendorProfile, name="vendor-profile"),
    path('menu-builder', views.menu_builder, name="menu_builder"), 
]