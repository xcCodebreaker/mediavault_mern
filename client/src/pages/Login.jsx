import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Input, Button } from '../components'
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
            placeholder="••••••••"
            value={password}
            onChange={handlePasswordChange}
            disabled={isLoading}
            required
            error={validationErrors.password}
          />

          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Securing Connection..."
          >
            Sign In to Vault
          </Button>
        </form>
      </div>

      <p className="auth-redirect">
        New to MediaVault? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  )
}
