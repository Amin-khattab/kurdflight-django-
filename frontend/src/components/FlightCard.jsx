import { Link } from 'react-router-dom'
import {
  formatAirportCode,
  formatAirportLocation,
  formatDateTime,
  formatDuration,
  formatMoney,
} from '../utils/formatters'

function FlightCard({ flight }) {
  return (
    <article className="flight-card">
      <div className="flight-card-top">
        <span className="flight-badge">KurdFlight</span>
        <span className="flight-number">Flight #{flight.id}</span>
      </div>

      <div className="flight-route">
        <div className="airport-block">
          <span className="airport-code">
            {formatAirportCode(flight.departure_airport)}
          </span>
          <span>{formatAirportLocation(flight.departure_airport)}</span>
        </div>
        <div className="route-track" aria-hidden="true">
          <span></span>
        </div>
        <div className="airport-block right">
          <span className="airport-code">
            {formatAirportCode(flight.arrival_airport)}
          </span>
          <span>{formatAirportLocation(flight.arrival_airport)}</span>
        </div>
      </div>

      <dl className="flight-meta">
        <div>
          <dt>Departure</dt>
          <dd>{formatDateTime(flight.departure_time)}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{formatDuration(flight.departure_time, flight.arrival_time)}</dd>
        </div>
        <div>
          <dt>Seats</dt>
          <dd>{flight.seats_available}</dd>
        </div>
      </dl>

      <div className="flight-card-footer">
        <p className="price">{formatMoney(flight.price)}</p>
        <Link className="button primary" to={`/flights/${flight.id}`}>
          View details
        </Link>
      </div>
    </article>
  )
}

export default FlightCard
