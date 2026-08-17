import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { validateEmail, validatePassword } from '../utils/validation.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  // Simple client-side validation
  function validateForm() {
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    setValidationErrors({
      email: emailError,
      password: passwordError,
    })

    return !emailError && !passwordError
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please verify your credentials.')
      setIsLoading(false)
    }
  }

  // Clear validation error when user edits inputs
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (validationErrors.email) {
      setValidationErrors(prev => ({ ...prev, email: '' }))
    }
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (validationErrors.password) {
      setValidationErrors(prev => ({ ...prev, password: '' }))
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Unlock your private media vault</p>
      </div>

      <div className="card">
        {error && (
          <div className="alert alert-error">
            <span className="alert-symbol">!</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">
              Email Address
            </label>
            <input
              id="email-input"
              className={`form-input ${validationErrors.email ? 'input-error' : ''}`.trim()}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              required
            />
            {validationErrors.email && (
              <span className="field-error-text">
                <span className="alert-symbol">!</span>
                {validationErrors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password-input">
              Password
            </label>
            <input
              id="password-input"
              className={`form-input ${validationErrors.password ? 'input-error' : ''}`.trim()}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
              required
            />
            {validationErrors.password && (
              <span className="field-error-text">
                <span className="alert-symbol">!</span>
                {validationErrors.password}
              </span>
            )}
          </div>

          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Securing Connection...' : 'Sign In to Vault'}
          </button>
        </form>
      </div>

      <p className="auth-redirect">
        New to MediaVault? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  )
}
