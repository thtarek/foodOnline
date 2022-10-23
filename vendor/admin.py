from django.contrib import admin

from .models import Vendor, OpeningHour

# Register your models here.
class VendorAdmin(admin.ModelAdmin):
    list_display = ('vendor_name','user', 'is_approved', 'created_at')
    list_display_links = ('vendor_name', 'user')
    ordering = ('-created_at',)

class OpeningHourAdmin(admin.ModelAdmin):
    list_display =('vendor', 'day', 'from_hour', 'to_hour', 'is_closed')

    

admin.site.register(Vendor, VendorAdmin)

admin.site.register(OpeningHour, OpeningHourAdmin)
