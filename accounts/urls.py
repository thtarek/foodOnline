from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.myAccount),
    path('register-user/', views.registerUser, name='register-user'),
    path('vendor-register/', views.registerVendor, name='vendor-register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('my-account/', views.myAccount, name='my-account'),
    path('customer-dashboard/', views.customerDashboard, name='customer-dashboard'),
    path('vendor-dashboard/', views.vendorDashboard, name='vendor-dashboard'),

    path('activate/<uidb64>/<token>/', views.activate, name="activate"),

    path('forgot-password/', views.forgotPassword, name='forgot-password'),
    path('reset-password-validate/<uidb64>/<token>/', views.restPasswordValidation, name='reset-password-validate'),
    path('reset-password', views.resetPassword, name='reset-password'),

    path('vendor/', include('vendor.urls'))
]