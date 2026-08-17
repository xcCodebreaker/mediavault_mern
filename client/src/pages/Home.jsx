import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'
import { apiRequest } from '../api/client.js'
import MoviePoster from '../components/MoviePoster.jsx'

export default function Home() {
  const { user } = useAuth()
  const [diaryEntries, setDiaryEntries] = useState(0)
  const [moviesLogged, setMoviesLogged] = useState(0)
  const [entries, setEntries] = useState([])

  useEffect(() => {
    if (!user) return

    async function fetchStats() {
      try {
        const data = await apiRequest('/api/diary')
        if (Array.isArray(data)) {
          setEntries(data)
          setDiaryEntries(data.length)
          const uniqueMovieIds = new Set(data.map((entry) => entry.tmdbMovieId).filter((id) => id != null))
          setMoviesLogged(uniqueMovieIds.size)
        }
      } catch (err) {
        console.error('Failed to fetch diary entries for home stats:', err)
      }
    }

    fetchStats()
  }, [user])

  const recentEntries = [...entries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)

  if (user) {
    return (
      <div className="dashboard-container">
        <div className="home-layout">
          <div className="home-main">
            <header className="dashboard-header">
              <h1 className="dashboard-title">Welcome back, {user.name}</h1>
              <p className="dashboard-subtitle">Your private vault is secure and ready.</p>
            </header>

            {recentEntries.length > 0 && (
              <section className="home-recent-grid">
                {recentEntries.map((entry) => {
                  const posterSrc = entry.posterPath
                    ? (entry.posterPath.startsWith('http') ? entry.posterPath : `https://image.tmdb.org/t/p/w500${entry.posterPath}`)
                    : null

                  return (
                    <div key={entry._id} className="home-recent-poster">
                      <Link to={`/movie/${entry.tmdbMovieId}`}>
                        <MoviePoster src={posterSrc} alt={entry.movieTitle || 'Movie poster'} />
                      </Link>
                    </div>
                  )
                })}
              </section>
            )}
          </div>

          <div className="home-sidebar">
            <section className="dashboard-grid">
              <div className="stat-card">
                <div className="stat-info">
                  <span className="stat-value">{moviesLogged}</span>
                  <span className="stat-label">Movies Logged</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <span className="stat-value">{diaryEntries}</span>
                  <span className="stat-label">Diary Entries</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <span className="stat-value">Active</span>
                  <span className="stat-label">Vault Status</span>
                </div>
              </div>
            </section>

            <div className="dashboard-actions">
              <Link to="/search" className="btn btn-primary dashboard-add-btn">
                Add New Movie
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="hero-container">
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
