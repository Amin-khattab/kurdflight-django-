import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { useAuth } from '../context/useAuth'

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      setIsLoading(true)
      await register(form)
      navigate('/login', {
        replace: true,
        state: { message: 'Account created. Please login.' },
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow">Create account</span>
        <h1>Join KurdFlight</h1>
        <p className="muted">Register once, then book flights from details pages.</p>

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

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <button type="submit" className="button primary full" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <Message type="error">{error}</Message>

        <p className="form-footer">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  )
}

export default Register
