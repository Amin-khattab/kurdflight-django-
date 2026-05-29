export function formatAirport(airport) {
  if (!airport) return 'Unknown airport'

  if (typeof airport === 'object') {
    if (airport.code && airport.city) return `${airport.code} - ${airport.city}`
    if (airport.name) return airport.name
  }

  return `Airport #${airport}`
}

export function formatAirportCode(airport) {
  if (!airport) return '---'
  if (typeof airport === 'object') return airport.code || airport.city || '---'
  return `#${airport}`
}

export function formatAirportLocation(airport) {
  if (!airport || typeof airport !== 'object') return 'Airport'
  if (airport.city && airport.country) return `${airport.city}, ${airport.country}`
  return airport.city || airport.name || 'Airport'
}

export function formatDateTime(value) {
  if (!value) return 'Not scheduled'

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function formatMoney(value) {
  const amount = Number(value)

  if (Number.isNaN(amount)) return value

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDuration(startValue, endValue) {
  if (!startValue || !endValue) return 'Not set'

  const minutes = Math.round(
    (new Date(endValue).getTime() - new Date(startValue).getTime()) / 60000,
  )

  if (Number.isNaN(minutes) || minutes < 0) return 'Not set'

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) return `${remainingMinutes}m`
  if (remainingMinutes === 0) return `${hours}h`

  return `${hours}h ${remainingMinutes}m`
}
