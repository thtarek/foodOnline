from django.urls import path, include
from accounts import views as AccountViews
from .import views
urlpatterns = [
    path('', AccountViews.customerDashboard, name='customer'),
    path('profile/', views.cprofile, name='cprofile'),
    path('my-orders/', views.my_orders, name='customer_my_orders'),
]