
from datetime import date, datetime
from django.shortcuts import render, get_object_or_404, HttpResponse
from accounts.models import UserProfile
from marketplace.context_processors import get_cart_counter, get_cart_amount
from orders.forms import orderForm
from vendor.models import OpeningHour, Vendor
from menu.models import Category, FoodItem
from django.db.models import Prefetch
from django.http import HttpResponse, JsonResponse
from .models import Cart
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect




# Create your views here.
def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

def marketplace(request):
    vendors = Vendor.objects.filter(is_approved=True, user__is_active=True)
    vendor_count = vendors.count()
    context = {
        'vendors' : vendors,
        'vendor_count' : vendor_count
    }
    return render(request, 'marketplace/lists.html', context)

def vendor_detail(request, vendor_slug):
    vendor = get_object_or_404(Vendor, vendor_slug=vendor_slug)
    categories = Category.objects.filter(vendor=vendor).prefetch_related(
        Prefetch(
            'fooditems',
            queryset = FoodItem.objects.filter(is_available=True)
        )
    )
    opening_hours = OpeningHour.objects.filter(vendor=vendor).order_by('day', '-from_hour')
    # Check current days opening Hours
    today_date = date.today()
    today = today_date.isoweekday()
    current_opening_hours = OpeningHour.objects.filter(vendor=vendor, day=today)
    
    if request.user.is_authenticated:
        cart_items = Cart.objects.filter(user=request.user)
    else:
        cart_items = None
    context={
        'vendor': vendor,
        'categories' : categories,
        'cart_items' : cart_items,
        'opening_hours': opening_hours,
        'current_opening_hours': current_opening_hours,
     
    }
    return render(request, 'marketplace/vendor_detail.html', context)

def add_to_cart(request, food_id):
    if request.user.is_authenticated:
        if is_ajax(request=request):
            # Check if the food item exist
            try:
                fooditem = FoodItem.objects.get(id=food_id)
                # Check if the user has already added that food to the cart
                try:
                    checkCart = Cart.objects.get(user=request.user, fooditem=fooditem)
                    # increase the cart qty
                    checkCart.quantity +=1
                    checkCart.save()
                    return JsonResponse({'status': 'Success', 'message':'Increased the cart quantity', 'cart_counter':get_cart_counter(request), 'qty':checkCart.quantity,'cart_amount':get_cart_amount(request)})
                except:
                   checkCart = Cart.objects.create(user=request.user, fooditem=fooditem, quantity=1)
                   return JsonResponse({'status': 'Success', 'message':'Added the food to the cart.', 'cart_counter':get_cart_counter(request), 'qty':checkCart.quantity, 'cart_amount':get_cart_amount(request)})

            except:
                return JsonResponse({'status': 'Failed', 'message':'This food does not exist'})

        else:
            return JsonResponse({'status': 'Failed', 'message':'Invalid request'})
    else:
        return JsonResponse({'status': 'login_required', 'message':'Please login to continue.'})

def decrease_cart(request, food_id):
    if request.user.is_authenticated:
        if is_ajax(request=request):
            # Check if the food item exist
            try:
                fooditem = FoodItem.objects.get(id=food_id)
                # Check if the user has already added that food to the cart
                try:
                    checkCart = Cart.objects.get(user=request.user, fooditem=fooditem)
                    # decrease the cart qty
                    if checkCart.quantity > 1:
                        checkCart.quantity -=1
                        checkCart.save()
                    else:
                        checkCart.delete()
                        checkCart.quantity = 0
                    return JsonResponse({'status': 'Success', 'cart_counter':get_cart_counter(request), 'qty':checkCart.quantity, 'cart_amount':get_cart_amount(request)})
                except:
                   return JsonResponse({'status': 'Failed', 'message':'You do not have this item in your cart'})

            except:
                return JsonResponse({'status': 'Failed', 'message':'This food does not exist'})

        else:
            return JsonResponse({'status': 'Failed', 'message':'Invalid request'})
    else:
        return JsonResponse({'status': 'login_required', 'message':'Please login to continue.'})
@login_required(login_url='login')
def cart(request):
    cart_items = Cart.objects.filter(user=request.user).order_by('created_at')
    context = {
        'cart_items':cart_items
    }
    return render(request, 'marketplace/cart.html', context)
def delete_cart_item(request, cart_id):
    if request.user.is_authenticated:
        if is_ajax(request=request):
            try:
                # if the cart item exist
                cart_item = Cart.objects.get(user=request.user, id=cart_id)
                if cart_item:
                    cart_item.delete()
                    return JsonResponse({'status': 'Success','message':'Cart item has been deleted!', 'cart_counter':get_cart_counter(request), 'cart_amount':get_cart_amount(request)})
            except:
                return JsonResponse({'status': 'Failed', 'message':'Cart item does not exist'})
        else:
            return JsonResponse({'status': 'Failed', 'message':'Invalid request'})
            
@login_required(login_url='login')
def checkout(request):
    cart_items = Cart.objects.filter(user=request.user).order_by('created_at')
    cart_count = cart_items.count()
    if cart_count <= 0:
        return redirect('marketplace')
    user_profile = UserProfile.objects.get(user=request.user)
    default_values = {
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
        'phone': request.user.phone_number,
        'email': request.user.email,
        'address': user_profile.address,
        'country': user_profile.country,
        'state': user_profile.state,
        'city': user_profile.city,
        'pin_code': user_profile.pin_code,
        
    }
    form = orderForm(initial=default_values)
    context = {
        'form': form,
        'cart_items' : cart_items,
    }
    return render(request, 'marketplace/checkout.html', context)
