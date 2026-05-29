import { useCallback, useMemo, useState } from 'react'
import { loginUser, logoutUser, registerUser } from '../api/auth'
import { AuthContext } from './contextObject'

const ACCESS_TOKEN_KEY = 'kurdflight_access_token'
const REFRESH_TOKEN_KEY = 'kurdflight_refresh_token'

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem(ACCESS_TOKEN_KEY),
  )
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem(REFRESH_TOKEN_KEY),
  )

  const login = useCallback(async (credentials) => {
    const data = await loginUser(credentials)
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
    setAccessToken(data.access)
    setRefreshToken(data.refresh)
    return data
  }, [])

  const register = useCallback(async (userData) => {
    return registerUser(userData)
  }, [])

  const logout = useCallback(async () => {
    if (accessToken && refreshToken) {
      await logoutUser(accessToken, refreshToken)
    }

    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    setAccessToken(null)
    setRefreshToken(null)
  }, [accessToken, refreshToken])

  const clearAuth = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    setAccessToken(null)
    setRefreshToken(null)
  }, [])

  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      isAuthenticated: Boolean(accessToken),
      login,
      register,
      logout,
      clearAuth,
    }),
    [accessToken, refreshToken, login, register, logout, clearAuth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
