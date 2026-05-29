from django.db import models
from django.contrib.auth.models import User

class Airport(models.Model):
    name = models.CharField(max_length = 255)
    city = models.CharField(max_length = 255)
    country = models.CharField(max_length = 255)
    code = models.CharField(max_length = 10,unique = True)

    def __str__(self):
        return f"{self.code} - {self.city}"

class Flight(models.Model):
    departure_airport = models.ForeignKey(Airport,related_name="departure_flights",on_delete=models.CASCADE)
    arrival_airport = models.ForeignKey(Airport,related_name="arrival_flights",on_delete=models.CASCADE)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    price = models.DecimalField(max_digits=10,decimal_places=2)
    seats_available = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.departure_airport.code} to {self.arrival_airport.code}"

class Booking(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    passengers = models.PositiveIntegerField()
    flight = models.ForeignKey(Flight,on_delete=models.CASCADE)
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking #{self.id} - {self.user.username}"
