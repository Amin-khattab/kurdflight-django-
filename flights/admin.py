from django.contrib import admin
from .models import Airport,Flight,Booking

@admin.register(Airport)
class AirportAdmin(admin.ModelAdmin):
    list_display = ("code", "name", "city", "country")
    search_fields = ("code", "name", "city", "country")


@admin.register(Flight)
class FlightAdmin(admin.ModelAdmin):
    list_display = (
        "departure_airport",
        "arrival_airport",
        "departure_time",
        "arrival_time",
        "price",
        "seats_available",
    )
    list_filter = ("departure_airport", "arrival_airport")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "flight", "passengers", "booked_at")
    list_filter = ("booked_at",)
