from django.shortcuts import render

# Create your views here.
def cprofile(request):
    return render(request, 'customers/cprofile.html')