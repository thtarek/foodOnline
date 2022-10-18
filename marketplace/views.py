
from django.shortcuts import render, get_object_or_404, HttpResponse
from marketplace.context_processors import get_cart_counter
from vendor.models import Vendor
from menu.models import Category, FoodItem
from django.db.models import Prefetch
from django.http import HttpResponse, JsonResponse
from .models import Cart



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
    if request.user.is_authenticated:
        cart_items = Cart.objects.filter(user=request.user)
    else:
        cart_items = None
    context={
        'vendor': vendor,
        'categories' : categories,
        'cart_items' : cart_items,
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
                    return JsonResponse({'status': 'Success', 'message':'Increased the cart quantity', 'cart_counter':get_cart_counter(request), 'qty':checkCart.quantity})
                except:
                   checkCart = Cart.objects.create(user=request.user, fooditem=fooditem, quantity=1)
                   return JsonResponse({'status': 'Success', 'message':'Added the food to the cart.', 'cart_counter':get_cart_counter(request), 'qty':checkCart.quantity})

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
                    return JsonResponse({'status': 'Success', 'cart_counter':get_cart_counter(request), 'qty':checkCart.quantity})
                except:
                   return JsonResponse({'status': 'Failed', 'message':'You do not have this item in your cart'})

            except:
                return JsonResponse({'status': 'Failed', 'message':'This food does not exist'})

        else:
            return JsonResponse({'status': 'Failed', 'message':'Invalid request'})
    else:
        return JsonResponse({'status': 'login_required', 'message':'Please login to continue.'})
