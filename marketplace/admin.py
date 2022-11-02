from django.contrib import admin

from marketplace.models import Cart, Tax

# Register your models here.

class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'fooditem', 'quantity', 'created_at', 'updated_at' )

class TaxAdmin(admin.ModelAdmin):
    list_display = ('tax_type', 'tax_percentage', 'is_active')

admin.site.register(Cart, CartAdmin)
admin.site.register(Tax, TaxAdmin)
