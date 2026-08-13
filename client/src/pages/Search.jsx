import { useState } from 'react'
import { apiRequest } from '../api/client.js'
import { Link } from 'react-router-dom'
import { MovieCard } from '../components'

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
          <span className="alert-symbol">!</span>
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
          {results.map((movie) => {
            const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
            const posterSrc = movie.poster_path ? `${TMDB_IMG_BASE}${movie.poster_path}` : null
            const rating = movie.vote_average > 0 ? movie.vote_average.toFixed(1) : null

            return (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="movie-card-link"
              >
                <MovieCard
                  title={movie.title}
                  year={year}
                  posterSrc={posterSrc}
                  rating={rating}
                />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
