import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'
import { apiRequest } from '../api/client.js'

export default function Home() {
  const { user } = useAuth()
  const [diaryEntries, setDiaryEntries] = useState(0)
  const [moviesLogged, setMoviesLogged] = useState(0)

  useEffect(() => {
    if (!user) return

    let isMounted = true

    async function fetchStats() {
      try {
        const data = await apiRequest('/api/diary')
        if (isMounted && Array.isArray(data)) {
          setDiaryEntries(data.length)
          const uniqueMovieIds = new Set(data.map((entry) => entry.tmdbMovieId).filter((id) => id != null))
          setMoviesLogged(uniqueMovieIds.size)
        }
      } catch (err) {
        console.error('Failed to fetch diary entries for home stats:', err)
      }
    }

    fetchStats()

    return () => {
      isMounted = false
    }
  }, [user])

  if (user) {
    return (
      <div className="dashboard-container animate-fade-in-up">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user.name}</h1>
          <p className="dashboard-subtitle">Your private vault is secure and ready.</p>
        </header>

        <div className="dashboard-actions">
          <Link to="/search" className="btn btn-primary">
            Add New Movie
          </Link>
        </div>

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
              <span className="stat-value">{moviesLogged}</span>
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
              <span className="stat-value">{diaryEntries}</span>
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
    </div>
  )
}
