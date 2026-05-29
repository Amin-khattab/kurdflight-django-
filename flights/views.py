from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics,serializers,status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Flight, Booking
from .serializers import FlightSerializer,UserSerializer,BookingSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

class FlightListView(generics.ListAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

class FlightViewDetail(generics.RetrieveAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

class LoginView(TokenObtainPairView):
    pass

class MyBookings(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user = self.request.user)

class CreateBooking(generics.CreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        flight = serializer.validated_data["flight"]
        passengers = serializer.validated_data["passengers"]

        if passengers > flight.seats_available:
            raise serializers.ValidationError("Not enough seats available")
        
        flight.seats_available -= passengers
        flight.save()

        serializer.save(user = self.request.user)

class Logout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        r_token = request.data.get("refresh")
        token = RefreshToken(r_token)
        token.blacklist()
        return Response({"message":"Successfully logged out"},
                        status=status.HTTP_200_OK)