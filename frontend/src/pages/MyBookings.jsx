import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMyBookings } from '../api/flights'
import Message from '../components/Message'
import { useAuth } from '../context/useAuth'
import {
  formatAirportCode,
  formatDateTime,
  formatMoney,
} from '../utils/formatters'

function MyBookings() {
  const { accessToken, clearAuth } = useAuth()
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadBookings() {
      try {
        setIsLoading(true)
        setError('')
        const data = await getMyBookings(accessToken)
        setBookings(data)
      } catch (err) {
        setError(err.message)

        if (err.message.toLowerCase().includes('token')) {
          clearAuth()
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadBookings()
  }, [accessToken, clearAuth])

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Your trips</span>
          <h1>My bookings</h1>
        </div>
        <Link to="/" className="button secondary">
          Book another flight
        </Link>
      </div>

      {isLoading && <p className="loading">Loading your bookings...</p>}
      <Message type="error">{error}</Message>

      {!isLoading && !error && bookings.length === 0 && (
        <div className="empty-state">
          <h3>No bookings yet</h3>
          <p>Choose a flight and confirm your passengers to start.</p>
        </div>
      )}

      <div className="booking-list">
        {bookings.map((booking) => (
          <article className="booking-item" key={booking.id}>
            <div className="booking-main">
              <span className="label">Booking</span>
              <h2>#{booking.id}</h2>
            </div>
            <div>
              <span className="label">Route</span>
              <p>
                {booking.flight_detail
                  ? `${formatAirportCode(
                      booking.flight_detail.departure_airport,
                    )} to ${formatAirportCode(
                      booking.flight_detail.arrival_airport,
                    )}`
                  : `Flight #${booking.flight}`}
              </p>
            </div>
            <div>
              <span className="label">Passengers</span>
              <p>{booking.passengers}</p>
            </div>
            <div>
              <span className="label">Price</span>
              <p>
                {booking.flight_detail
                  ? formatMoney(booking.flight_detail.price)
                  : 'Confirmed'}
              </p>
            </div>
            <div>
              <span className="label">Booked at</span>
              <p>{formatDateTime(booking.booked_at)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MyBookings
