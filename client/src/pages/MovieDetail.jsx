import { useState, useEffect } from 'react'
import { apiRequest } from '../api/client.js'
import { useParams, Link } from 'react-router-dom'

const TMDB_IMG_BASE = 'https://image.tmdb.org/t/p/w500'

export default function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchMovie() {
      setIsLoading(true)
      setError('')

      try {
        const data = await apiRequest(`/tmdb/movie/${id}`)
        if (!cancelled) {
          setMovie(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load movie details.')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    if (id) {
      fetchMovie()
    }

    return () => { cancelled = true }
  }, [id])

  if (isLoading) {
    return (
      <div className="movie-detail-loading">
        <div className="spinner"></div>
        <span>Loading movie details...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="movie-detail-page">
        <div className="alert alert-error">
          <svg className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
        <Link to="/search" className="btn btn-secondary movie-detail-back-btn">Back to Search</Link>
      </div>
    )
  }

  if (!movie) return null

  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
  const runtime = movie.runtime ? `${movie.runtime} min` : null
  const genres = movie.genres ? movie.genres.map(g => g.name).join(', ') : null

  return (
    <div className="movie-detail-page">
      <Link to="/search" className="movie-detail-back-link">← Back to Search</Link>

      <div className="movie-detail-layout">
        <div className="movie-detail-poster-col">
          {movie.poster_path ? (
            <img
              className="movie-detail-poster"
              src={`${TMDB_IMG_BASE}${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className="movie-detail-poster movie-detail-poster-fallback">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                <line x1="7" y1="2" x2="7" y2="22" />
                <line x1="17" y1="2" x2="17" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
              </svg>
            </div>
          )}
        </div>

        <div className="movie-detail-info-col">
          <h1 className="movie-detail-title">{movie.title}</h1>

          <div className="movie-detail-meta">
            <span>{year}</span>
            {runtime && <span>{runtime}</span>}
            {movie.vote_average > 0 && (
              <span className="movie-detail-rating">
                <svg className="movie-rating-star" viewBox="0 0 24 24" width="14" height="14">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {movie.vote_average.toFixed(1)}
              </span>
            )}
          </div>

          {genres && (
            <p className="movie-detail-genres">{genres}</p>
          )}

          {movie.overview && (
            <div className="movie-detail-overview">
              <h2 className="movie-detail-section-title">Overview</h2>
              <p>{movie.overview}</p>
            </div>
          )}

          {movie.tagline && (
            <p className="movie-detail-tagline">"{movie.tagline}"</p>
          )}
        </div>
      </div>
    </div>
  )
}
