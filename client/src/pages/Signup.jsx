import { useState } from 'react'
import { useNavigate, Link } from '../context/RouterContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  // Client-side validations
  function validateForm() {
    const errors = { name: '', email: '', password: '', confirmPassword: '' }
    let isValid = true

    if (!name.trim()) {
      errors.name = 'Full name is required'
      isValid = false
    }

    if (!email.trim()) {
      errors.email = 'Email address is required'
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

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
      isValid = false
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
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
      await signup(name, email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Failed to create an account. Please try again.')
      setIsLoading(false)
    }
  }

  // Clear validation errors when inputs change
  const handleNameChange = (e) => {
    setName(e.target.value)
    if (validationErrors.name) {
      setValidationErrors(prev => ({ ...prev, name: '' }))
    }
  }

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
    if (confirmPassword && e.target.value !== confirmPassword) {
      setValidationErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }))
    } else if (confirmPassword && e.target.value === confirmPassword) {
      setValidationErrors(prev => ({ ...prev, confirmPassword: '' }))
    }
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (password !== e.target.value) {
      setValidationErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }))
    } else {
      setValidationErrors(prev => ({ ...prev, confirmPassword: '' }))
    }
  }

  return (
    <div className="auth-wrapper animate-fade-in-up">
      <div className="auth-header">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Initialize your private secure space</p>
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
            <label className="form-label" htmlFor="name-input">
              Full Name
            </label>
            <div className="input-wrapper">
              <input
                id="name-input"
                className={`form-input ${validationErrors.name ? 'input-error' : ''}`}
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={handleNameChange}
                disabled={isLoading}
                required
              />
            </div>
            {validationErrors.name && (
              <span className="field-error-text">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {validationErrors.name}
              </span>
            )}
          </div>

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
                placeholder="At least 6 characters"
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

          <div className="form-group">
            <label className="form-label" htmlFor="confirm-password-input">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <input
                id="confirm-password-input"
                className={`form-input ${validationErrors.confirmPassword ? 'input-error' : ''}`}
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                disabled={isLoading}
                required
              />
            </div>
            {validationErrors.confirmPassword && (
              <span className="field-error-text">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {validationErrors.confirmPassword}
              </span>
            )}
          </div>

          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Securing Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>
      </div>

      <p className="auth-redirect">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}
