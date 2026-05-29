import { useEffect, useState } from 'react'
import { getFlights } from '../api/flights'
import FlightCard from '../components/FlightCard'
import Message from '../components/Message'
import { formatMoney } from '../utils/formatters'

function Home() {
  const [flights, setFlights] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadFlights() {
      try {
        setIsLoading(true)
        setError('')
        const data = await getFlights()
        setFlights(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadFlights()
  }, [])

  const totalSeats = flights.reduce(
    (total, flight) => total + Number(flight.seats_available || 0),
    0,
  )
  const lowestPrice = flights.reduce((lowest, flight) => {
    const price = Number(flight.price)
    if (Number.isNaN(price)) return lowest
    return lowest === null ? price : Math.min(lowest, price)
  }, null)

  return (
    <section className="page-section">
      <div className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Kurdistan flights made simple</span>
          <h1>Book bright routes across the region.</h1>
          <p>
            Compare routes, check seat availability, and reserve your trip with
            a clean booking flow built on your Django API.
          </p>
        </div>

        <div className="hero-dashboard">
          <div>
            <span>{flights.length}</span>
            <p>available flights</p>
          </div>
          <div>
            <span>{totalSeats}</span>
            <p>open seats</p>
          </div>
          <div>
            <span>{lowestPrice === null ? '--' : formatMoney(lowestPrice)}</span>
            <p>starting price</p>
          </div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span className="eyebrow">Live schedule</span>
          <h2>Available flights</h2>
        </div>
        <p className="section-note">
          Select a route to view details and book passengers.
        </p>
      </div>

      {isLoading && <p className="loading">Loading flights...</p>}
      <Message type="error">{error}</Message>

      {!isLoading && !error && flights.length === 0 && (
        <div className="empty-state">
          <h3>No flights yet</h3>
          <p>Add flights in Django admin, then refresh this page.</p>
        </div>
      )}

      <div className="flight-grid">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </section>
  )
}

export default Home
