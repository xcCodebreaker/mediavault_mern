import { useState } from 'react'
import { apiRequest } from '../api/client.js'
import { Link } from 'react-router-dom'

const TMDB_IMG_BASE = 'https://image.tmdb.org/t/p/w500'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    setError('')
    setIsLoading(true)
    setHasSearched(true)

    try {
      const data = await apiRequest(`/tmdb/search?query=${encodeURIComponent(trimmed)}`)
      setResults(data)
    } catch (err) {
      setError(err.message || 'Search failed. Please try again.')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="search-page">
      <h1 className="search-page-title">Search Movies</h1>
      <p className="search-page-subtitle">Find movies to add to your vault</p>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="movie-search-input"
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button
          className="btn btn-primary search-btn"
          type="submit"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="alert alert-error">
          <svg className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="search-loading">
          <div className="spinner"></div>
          <span>Searching TMDB...</span>
        </div>
      )}

      {!isLoading && hasSearched && results.length === 0 && !error && (
        <div className="search-empty">
          <p className="search-empty-text">No movies found for "{query}"</p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="movies-grid">
          {results.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="movie-card-link"
            >
              <div className="movie-card">
                <div className="movie-poster-wrapper">
                  {movie.poster_path ? (
                    <img
                      className="movie-poster"
                      src={`${TMDB_IMG_BASE}${movie.poster_path}`}
                      alt={movie.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="movie-poster movie-poster-fallback">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                        <line x1="7" y1="2" x2="7" y2="22" />
                        <line x1="17" y1="2" x2="17" y2="22" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                      </svg>
                    </div>
                  )}
                  <div className="movie-overlay"></div>
                  {movie.vote_average > 0 && (
                    <div className="movie-rating">
                      <svg className="movie-rating-star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-meta">
                    <span className="movie-year">
                      {movie.release_date ? movie.release_date.slice(0, 4) : '—'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
