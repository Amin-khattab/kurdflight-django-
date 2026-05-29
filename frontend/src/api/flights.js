import { apiRequest, authHeaders } from './client'

export function getFlights() {
  return apiRequest('/flights/')
}

export function getFlight(id) {
  return apiRequest(`/flights/${id}/`)
}

export function createBooking(accessToken, booking) {
  return apiRequest('/bookings/', {
    method: 'POST',
    headers: authHeaders(accessToken),
    body: JSON.stringify(booking),
  })
}

export function getMyBookings(accessToken) {
  return apiRequest('/my-bookings/', {
    headers: authHeaders(accessToken),
  })
}
