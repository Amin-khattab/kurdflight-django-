import { buildApiUrl } from './config'

function getErrorMessage(data, fallback) {
  if (!data) return fallback
  if (typeof data === 'string') return data
  if (Array.isArray(data)) return data.join(' ')
  if (data.detail) return data.detail
  if (data.message) return data.message

  return Object.entries(data)
    .map(([field, value]) => {
      const text = Array.isArray(value) ? value.join(' ') : String(value)
      return `${field}: ${text}`
    })
    .join(' ')
}

export async function apiRequest(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const response = await fetch(buildApiUrl(endpoint), {
    ...options,
    headers,
  })

  let data = null
  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('application/json')) {
    data = await response.json()
  }

  if (!response.ok) {
    throw new Error(getErrorMessage(data, 'Something went wrong.'))
  }

  return data
}

export function authHeaders(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
  }
}
