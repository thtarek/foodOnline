from django.urls import path
from . import views

urlpatterns = [
    path('register-user/', views.registerUser, name='register-user'),
    path('vendor-register/', views.registerVendor, name='vendor-register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('my-account/', views.myAccount, name='my-account'),
    path('customer-dashboard/', views.customerDashboard, name='customer-dashboard'),
    path('vendor-dashboard/', views.vendorDashboard, name='vendor-dashboard'),
    path('activate/<uidb64>/<token>/', views.activate, name="activate"),
]