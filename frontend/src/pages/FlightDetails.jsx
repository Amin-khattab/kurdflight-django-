import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createBooking, getFlight } from '../api/flights'
import Message from '../components/Message'
import { useAuth } from '../context/useAuth'
import {
  formatAirport,
  formatAirportCode,
  formatAirportLocation,
  formatDateTime,
  formatDuration,
  formatMoney,
} from '../utils/formatters'

function FlightDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { accessToken, isAuthenticated } = useAuth()
  const [flight, setFlight] = useState(null)
  const [passengers, setPassengers] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isBooking, setIsBooking] = useState(false)
  const [error, setError] = useState('')
  const [bookingMessage, setBookingMessage] = useState('')

  useEffect(() => {
    async function loadFlight() {
      try {
        setIsLoading(true)
        setError('')
        const data = await getFlight(id)
        setFlight(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadFlight()
  }, [id])

  async function handleSubmit(event) {
    event.preventDefault()
    setBookingMessage('')
    setError('')

    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/flights/${id}` } })
      return
    }

    try {
      setIsBooking(true)
      await createBooking(accessToken, {
        flight: Number(id),
        passengers: Number(passengers),
      })
      setBookingMessage('Booking created successfully.')
      setFlight((current) =>
        current
          ? {
              ...current,
              seats_available: current.seats_available - Number(passengers),
            }
          : current,
      )
      setPassengers(1)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsBooking(false)
    }
  }

  if (isLoading) {
    return (
      <section className="page-section">
        <p className="loading">Loading flight details...</p>
      </section>
    )
  }

  if (error && !flight) {
    return (
      <section className="page-section narrow">
        <Message type="error">{error}</Message>
        <Link to="/" className="button secondary">
          Back to flights
        </Link>
      </section>
    )
  }

  return (
    <section className="page-section">
      <Link to="/" className="back-link">
        Back to flights
      </Link>

      <div className="details-layout">
        <article className="details-panel">
          <span className="eyebrow">Flight #{flight.id}</span>
          <div className="details-route">
            <div>
              <span>{formatAirportCode(flight.departure_airport)}</span>
              <p>{formatAirportLocation(flight.departure_airport)}</p>
            </div>
            <div className="route-track large" aria-hidden="true">
              <span></span>
            </div>
            <div>
              <span>{formatAirportCode(flight.arrival_airport)}</span>
              <p>{formatAirportLocation(flight.arrival_airport)}</p>
            </div>
          </div>

          <h1>
            {formatAirport(flight.departure_airport)} to{' '}
            {formatAirport(flight.arrival_airport)}
          </h1>

          <dl className="details-list">
            <div>
              <dt>Departure</dt>
              <dd>{formatDateTime(flight.departure_time)}</dd>
            </div>
            <div>
              <dt>Arrival</dt>
              <dd>{formatDateTime(flight.arrival_time)}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{formatDuration(flight.departure_time, flight.arrival_time)}</dd>
            </div>
            <div>
              <dt>Seats available</dt>
              <dd>{flight.seats_available}</dd>
            </div>
            <div>
              <dt>Price per passenger</dt>
              <dd>{formatMoney(flight.price)}</dd>
            </div>
          </dl>
        </article>

        <aside className="booking-panel">
          <h2>Book this flight</h2>
          <p className="muted">
            Choose how many passengers you want to book for this trip.
          </p>

          {!isAuthenticated && (
            <Message>
              Please log in before booking. Your flight page will stay ready.
            </Message>
          )}

          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="passengers">Passengers</label>
            <input
              id="passengers"
              min="1"
              max={Math.max(1, flight.seats_available)}
              type="number"
              value={passengers}
              onChange={(event) => setPassengers(event.target.value)}
              required
            />

            <button
              type="submit"
              className="button primary full"
              disabled={isBooking || flight.seats_available === 0}
            >
              {isBooking ? 'Booking...' : 'Confirm booking'}
            </button>
          </form>

          <Message type="success">{bookingMessage}</Message>
          {error && <Message type="error">{error}</Message>}
        </aside>
      </div>
    </section>
  )
}

export default FlightDetails
