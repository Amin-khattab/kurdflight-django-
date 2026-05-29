from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Airport,Flight,Booking

class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ["id","name","city","country","code"]

class FlightSerializer(serializers.ModelSerializer):
    departure_airport = AirportSerializer(read_only=True)
    arrival_airport = AirportSerializer(read_only=True)

    class Meta:
        model = Flight
        fields = ["id","departure_airport","arrival_airport",
                "departure_time","arrival_time","price","seats_available"]

class BookingSerializer(serializers.ModelSerializer):
    flight_detail = FlightSerializer(source="flight", read_only=True)

    class Meta:
        model = Booking
        fields = ["id","passengers","user","flight","flight_detail","booked_at"]
        extra_kwargs = {"user":{"read_only":True}}

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","email","password"]
        extra_kwargs = {"password":{"write_only":True}}
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
