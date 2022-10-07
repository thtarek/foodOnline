from email import message
from django.shortcuts import render
from  .forms import userForm
from vendor.forms import vendorForm
from .models import User, UserProfile
from django.shortcuts import redirect
from django.contrib import messages, auth
from .utils import detectUser, send_verification_email
from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.exceptions import PermissionDenied
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from vendor.models import Vendor



# Restrict the vendor from accessing the customer page.
def check_role_vendor(user):
    if user.role == 1:
        return True
    else:
        raise PermissionDenied
# Restrict the vendor from accessing the customer page.
def check_role_customer(user):
    if user.role == 2:
        return True
    else:
        raise PermissionDenied 

def registerUser(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    elif request.method == 'POST':
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
            # Send verification email
            mail_subject = 'Activate Your Account'
            email_template = 'accounts/emails/email_verification.html'
            send_verification_email(request, user, mail_subject, email_template)
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
    if request.user.is_authenticated:
        return redirect('dashboard')
    elif request.method == 'POST':
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
            # Send verification email
            mail_subject = 'Activate Your Account'
            email_template = 'accounts/emails/email_verification.html'
            send_verification_email(request, user, mail_subject, email_template)
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

def activate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User._default_manager.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        messages.success(request, 'Your account is activate!')
        return redirect('my-account')
    else:
        messages.error(request, 'Invalid activation link!')
        return redirect('my-account')
    

def login(request):
    if request.user.is_authenticated:
        return redirect('my-account')
    elif request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = auth.authenticate(email=email, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('my-account')
        else:
            messages.error(request,'The password or email that you have entered is incorrect.')
            return redirect('login')
    return render(request, 'accounts/login.html')
def logout(request):
    auth.logout(request)
    return redirect('login')
@login_required(login_url='login')
def myAccount(request):
    redirectUrl = detectUser(request.user)
    return redirect(redirectUrl) 
@login_required(login_url='login')
@user_passes_test(check_role_customer)
def customerDashboard(request):
    return render(request, 'accounts/custdashboard.html')

@login_required(login_url='login')
@user_passes_test(check_role_vendor)
def vendorDashboard(request):
    return render(request, 'accounts/vendashboard.html')


def forgotPassword(request):
    if request.method == 'POST':
        email = request.POST['email']
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email__exact=email)
            # Send the reset password email.
            mail_subject = 'Reset your password'
            email_template = 'accounts/emails/reset_password_email.html'
            send_verification_email(request, user, mail_subject, email_template)
            messages.success(request, 'Password reset link has been sent to your email address.')
            return redirect('login')
        else:
            messages.error(request, 'Account does not exist.')
            return redirect('forgot-password')

    return render(request, 'accounts/forgot_password.html')
def restPasswordValidation(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User._default_manager.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        request.session['uid'] = uid
        messages.info(request, 'Please reset your password')
        return redirect('reset-password')
    else:
        messages.error(request, 'This link has been expired.')
        return redirect('my-account')
def resetPassword(request):
    if request.method == 'POST':
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']
        if password == confirm_password:
            uid = request.session.get('uid')
            user = User.objects.get(pk=uid)
            user.set_password(password)
            user.is_active = True
            user.save()
            messages.success(request, 'Password reset successful')
            return redirect('login')
        else:
            messages.error(request, 'Password do not match.')
            return redirect('reset-password')
    return render(request, 'accounts/reset_password.html')
    
