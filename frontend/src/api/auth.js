import { apiRequest, authHeaders } from './client'

export function registerUser(userData) {
  return apiRequest('/auth/register/', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
}

export function loginUser(credentials) {
  return apiRequest('/auth/login/', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export function logoutUser(accessToken, refreshToken) {
  return apiRequest('/auth/logout/', {
    method: 'POST',
    headers: authHeaders(accessToken),
    body: JSON.stringify({ refresh: refreshToken }),
  })
}
