import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Layout() {
  const { isAuthenticated, logout, clearAuth } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await logout()
    } catch {
      clearAuth()
    } finally {
      navigate('/login')
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="KurdFlight home">
          <span className="brand-mark">KF</span>
          <span>KurdFlight</span>
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/">Flights</NavLink>
          {isAuthenticated && <NavLink to="/my-bookings">My Bookings</NavLink>}
          {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
          {!isAuthenticated && <NavLink to="/register">Register</NavLink>}
          {isAuthenticated && (
            <button type="button" className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
