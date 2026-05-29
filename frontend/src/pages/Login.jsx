import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { useAuth } from '../context/useAuth'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const redirectTo =
    typeof location.state?.from === 'string'
      ? location.state.from
      : location.state?.from?.pathname || '/'

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      setIsLoading(true)
      await login(form)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow">Welcome back</span>
        <h1>Login to KurdFlight</h1>
        <p className="muted">Use your Django account to manage bookings.</p>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          <button type="submit" className="button primary full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <Message type="success">{location.state?.message}</Message>
        <Message type="error">{error}</Message>

        <p className="form-footer">
          No account yet? <Link to="/register">Create one</Link>
        </p>
      </div>
    </section>
  )
}

export default Login
