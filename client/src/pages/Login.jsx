import { useState } from 'react'
import { useNavigate, Link } from '../main.jsx'
import { useAuth } from '../context/AuthContext.jsx'

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
    const errors = { email: '', password: '' }
    let isValid = true

    if (!email.trim()) {
      errors.email = 'Email is required'
      isValid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address'
        isValid = false
      }
    }

    if (!password) {
      errors.password = 'Password is required'
      isValid = false
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    setValidationErrors(errors)
    return isValid
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
    <div className="auth-wrapper animate-fade-in-up">
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Unlock your private media vault</p>
      </div>

      <div className="card">
        {error && (
          <div className="alert alert-error">
            <svg className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                id="email-input"
                className={`form-input ${validationErrors.email ? 'input-error' : ''}`}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                required
              />
            </div>
            {validationErrors.email && (
              <span className="field-error-text">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {validationErrors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password-input">
              Password
            </label>
            <div className="input-wrapper">
              <input
                id="password-input"
                className={`form-input ${validationErrors.password ? 'input-error' : ''}`}
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                required
              />
            </div>
            {validationErrors.password && (
              <span className="field-error-text">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {validationErrors.password}
              </span>
            )}
          </div>

          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Securing Connection...</span>
              </>
            ) : (
              <span>Sign In to Vault</span>
            )}
          </button>
        </form>
      </div>

      <p className="auth-redirect">
        New to MediaVault? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  )
}
