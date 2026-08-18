import { useState, useEffect } from 'react'
import { apiRequest } from '../api/client.js'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import RatingStars from '../components/RatingStars.jsx'

const TMDB_IMG_BASE = 'https://image.tmdb.org/t/p/w500'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [watchedDate, setWatchedDate] = useState(
    () => new Date().toISOString().split('T')[0]
  )
  const [rating, setRating] = useState(0)
  const [note, setNote] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!movie) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await apiRequest('/api/diary', {
        method: 'POST',
        body: JSON.stringify({
          tmdbMovieId: movie.id,
          movieTitle: movie.title,
          posterPath: movie.poster_path,
          watchedDate,
          rating,
          note,
        }),
      })
      navigate('/diary')
    } catch (err) {
      setSubmitError(err.message || 'Failed to log movie. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true)
      setError('')

      try {
        const data = await apiRequest(`/tmdb/movie/${id}`)
        setMovie(data)
      } catch (err) {
        setError(err.message || 'Failed to load movie details.')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchMovie()
    }
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
          <span className="alert-symbol">!</span>
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
              <span>No Poster</span>
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
                <span className="movie-rating-star">★</span>
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

      {user && (
        <section className="card log-movie-section">
          <h2 className="movie-detail-section-title">Log this movie</h2>

          {submitError && (
            <div className="alert alert-error">
              <span className="alert-symbol">!</span>
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="log-movie-form">
            <div className="form-group">
              <label className="form-label" htmlFor="watchedDate">Watched Date</label>
              <input
                id="watchedDate"
                type="date"
                className="form-input"
                value={watchedDate}
                onChange={(e) => setWatchedDate(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Rating</label>
              <RatingStars
                rating={rating}
                onChange={(newRating) => setRating(newRating)}
                size={24}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="note">Note</label>
              <textarea
                id="note"
                className="form-textarea"
                placeholder="Add your thoughts or review..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                disabled={isSubmitting}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  <span>Logging Movie...</span>
                </>
              ) : (
                <span>Log Movie</span>
              )}
            </button>
          </form>
        </section>
      )}
    </div>
  )
}
