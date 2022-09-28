from django.shortcuts import render
from  .forms import userForm
from vendor.forms import vendorForm
from .models import User, UserProfile
from django.shortcuts import redirect
from django.contrib import messages



# Create your views here.

def registerUser(request):
    if request.method == 'POST':
        # print(request.POST)
        form = userForm(request.POST)
        if form.is_valid():
            #Create the user using form
            #password = form.cleaned_data['password']
            # user = form.save(commit=False)
            #user.set_password(password)
            # user.role = User.CUSTOMER
            # user.save()
            # return redirect('register-user')

            #Create the user using create_user method
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            phone_number = form.cleaned_data['phone_number']
            email = form.cleaned_data['email']
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = User.objects.create_user(first_name=first_name, last_name=last_name, phone_number=phone_number, email=email, username=username, password=password )
            user.role = User.CUSTOMER
            user.save()
            messages.success(request, 'Your account has been registered successfully!')
            return redirect('register-user')
        # else:
        #     print(form.errors)
            
    else:
        form = userForm()
    context = {
        'form': form
    }
    return render(request, 'accounts/register_user.html', context)

def registerVendor(request):
    if request.method == 'POST':
        form = userForm(request.POST)
        v_form = vendorForm(request.POST, request.FILES)
        if form.is_valid() and v_form.is_valid():
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            phone_number = form.cleaned_data['phone_number']
            email = form.cleaned_data['email']
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = User.objects.create_user(first_name=first_name, last_name=last_name, phone_number=phone_number, email=email, username=username, password=password )
            user.role = User.VENDOR
            user.save()
            vendor = v_form.save(commit=False)
            vendor.user = user
            user_profile = UserProfile.objects.get(user=user)
            vendor.user_profile = user_profile
            vendor.save()
            messages.success(request, 'Your account has been registered successfully!')
            return redirect('vendor-register')
        else:
             print(form.errors)

    else:
         form = userForm()
         v_form = vendorForm()

    context = {
       'form': form,
       'v_form': v_form,
    }
    return render(request, 'accounts/register_vendor.html', context)
