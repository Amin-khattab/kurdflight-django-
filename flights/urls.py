from django.urls import path
from .views import FlightListView,FlightViewDetail,RegisterView,LoginView,MyBookings,CreateBooking,Logout

urlpatterns = [
    path("flights/",FlightListView.as_view(),name="flights-list"),
    path("flights/<int:pk>/",FlightViewDetail.as_view(),name="flight-detail"),
    path("auth/register/",RegisterView.as_view(),name="user"),
    path("auth/login/",LoginView.as_view(),name="login"),
    path("my-bookings/",MyBookings.as_view(),name="my-bookings"),
    path("bookings/",CreateBooking.as_view(),name="booking"),
    path("auth/logout/",Logout.as_view(),name="logout")
]