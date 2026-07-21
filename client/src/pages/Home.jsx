import { useAuth } from '../context/AuthContext.jsx'
import { Link } from '../main.jsx'

export default function Home() {
  const { user } = useAuth()

  if (user) {
    return (
      <div className="dashboard-container animate-fade-in-up">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user.name}</h1>
          <p className="dashboard-subtitle">Your private vault is secure and ready.</p>
        </header>

        <section className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                <line x1="7" y1="2" x2="7" y2="22" />
                <line x1="17" y1="2" x2="17" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="2" y1="7" x2="7" y2="7" />
                <line x1="2" y1="17" x2="7" y2="17" />
                <line x1="17" y1="17" x2="22" y2="17" />
                <line x1="17" y1="7" x2="22" y2="7" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">0</span>
              <span className="stat-label">Movies Logged</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">0</span>
              <span className="stat-label">Diary Entries</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="stat-info">
              <span className="stat-value">Active</span>
              <span className="stat-label">Vault Status</span>
            </div>
          </div>
        </section>

        <div className="card empty-vault-card">
          <div className="empty-vault-icon-wrapper">
            <svg className="empty-vault-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
              <path d="M12 8v8" strokeWidth="2" />
              <path d="M8 12h8" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="empty-vault-title">Your Cinematic Vault is Empty</h3>
          <p className="empty-vault-text">
            Your authentication was successful and your media diary is online. Movie searching, logging, and personal diary reviews will be unlocked in a future update!
          </p>
          <button 
            className="btn btn-primary empty-vault-btn" 
            onClick={() => alert("Movie database integrations and logging capabilities are coming soon!")}
          >
            Explore Features Preview
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="hero-container animate-fade-in-up">
      <span className="hero-badge">Welcome to MediaVault</span>
      <h1 className="hero-title">Your Private Cinematic Sanctuary</h1>
      <p className="hero-subtitle">
        Securely log movies, write thoughts, rate titles, and grow your personal viewing history vault.
      </p>

      <div className="hero-actions">
        <Link to="/signup" className="btn btn-primary">
          Create Free Vault
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Sign In
        </Link>
      </div>

      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h3 className="feature-title">Secure Vault</h3>
          <p className="feature-description">
            Your personal reviews, ratings, and logs are protected. Keep your private movie logs private.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
          </div>
          <h3 className="feature-title">Watch History</h3>
          <p className="feature-description">
            Maintain a visual diary of every title you watch, complete with watch dates and quick stats.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h3 className="feature-title">Custom Ratings</h3>
          <p className="feature-description">
            Add detailed scores, write down comments, and easily search your archive.
          </p>
        </div>
      </section>
    </div>
  )
}
