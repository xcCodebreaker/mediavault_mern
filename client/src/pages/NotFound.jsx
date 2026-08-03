import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="auth-wrapper animate-fade-in-up">
      <div className="auth-header">
        <h1 className="auth-title" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>404</h1>
        <h2 className="auth-subtitle" style={{ fontSize: '1.25rem' }}>Page Not Found</h2>
      </div>

      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: 'var(--color-text-secondary, #cbd5e1)', marginBottom: '1.5rem' }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-block' }}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
