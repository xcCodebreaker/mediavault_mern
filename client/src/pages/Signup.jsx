import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { validateEmail, validatePassword } from '../utils/validation.js'

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

    errors.email = validateEmail(email)
    if (errors.email) {
      isValid = false
    }

    errors.password = validatePassword(password)
    if (errors.password) {
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
    <div className="auth-wrapper">
      <div className="auth-header">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Initialize your private secure space</p>
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
            <label className="form-label" htmlFor="name-input">
              Full Name
            </label>
            <input
              id="name-input"
              className={validationErrors.name ? 'form-input input-error' : 'form-input'}
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={handleNameChange}
              disabled={isLoading}
              required
            />
            {validationErrors.name && (
              <span className="field-error-text">
                <span className="alert-symbol">!</span>
                {validationErrors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email-input">
              Email Address
            </label>
            <input
              id="email-input"
              className={validationErrors.email ? 'form-input input-error' : 'form-input'}
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
              className={validationErrors.password ? 'form-input input-error' : 'form-input'}
              type="password"
              placeholder="At least 6 characters"
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

          <div className="form-group">
            <label className="form-label" htmlFor="confirm-password-input">
              Confirm Password
            </label>
            <input
              id="confirm-password-input"
              className={validationErrors.confirmPassword ? 'form-input input-error' : 'form-input'}
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              disabled={isLoading}
              required
            />
            {validationErrors.confirmPassword && (
              <span className="field-error-text">
                <span className="alert-symbol">!</span>
                {validationErrors.confirmPassword}
              </span>
            )}
          </div>

          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Securing Account...' : 'Create Account'}
          </button>
        </form>
      </div>

      <p className="auth-redirect">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}
