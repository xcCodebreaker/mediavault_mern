import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Input, Button } from '../components'
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
          <Input
            id="name-input"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={handleNameChange}
            disabled={isLoading}
            required
            error={validationErrors.name}
          />

          <Input
            id="email-input"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleEmailChange}
            disabled={isLoading}
            required
            error={validationErrors.email}
          />

          <Input
            id="password-input"
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={handlePasswordChange}
            disabled={isLoading}
            required
            error={validationErrors.password}
          />

          <Input
            id="confirm-password-input"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            disabled={isLoading}
            required
            error={validationErrors.confirmPassword}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Securing Account..."
          >
            Create Account
          </Button>
        </form>
      </div>

      <p className="auth-redirect">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}
