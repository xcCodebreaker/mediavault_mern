// Note: your diary entries don't currently store the movie's release year, only the watched date, so the year shown next to each title in this list will be the watched year, not the release year.
import { useState, useEffect } from 'react'
import { apiRequest } from '../api/client.js'
import { MoviePoster, RatingStars } from '../components'

export default function Reviews() {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true)
      setError('')
      try {
        const data = await apiRequest('/api/diary')
        if (Array.isArray(data)) {
          setEntries(data)
        }
      } catch (err) {
        setError(err.message || 'Failed to load diary entries.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // Filter entries to only those with a non-empty written review
  const reviews = entries.filter((entry) => typeof entry.note === 'string' && entry.note.trim().length > 0)

  return (
    <div className="reviews-page movies-container animate-fade-in-up">
      <h1 className="search-page-title">Reviews</h1>
      <p className="search-page-subtitle">Your personal collection of written movie reviews</p>

      {error && (
        <div className="alert alert-error">
          <span className="alert-symbol">!</span>
          <span>{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="search-loading">
          <div className="spinner"></div>
          <span>Loading reviews...</span>
        </div>
      )}

      {!isLoading && !error && reviews.length === 0 && (
        <div className="search-empty">
          <p className="search-empty-text">No diary entries yet.</p>
        </div>
      )}

      {!isLoading && reviews.length > 0 && (
        <div className="review-list">
          {reviews.map((entry, index) => {
            const posterSrc = entry.posterPath
              ? (entry.posterPath.startsWith('http') ? entry.posterPath : `https://image.tmdb.org/t/p/w200${entry.posterPath}`)
              : null

            const formattedDate = entry.watchedDate
              ? new Date(entry.watchedDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : null

            const watchedYear = entry.watchedDate ? new Date(entry.watchedDate).getFullYear() : null

            return (
              <div key={entry._id || index}>
                <div className="review-row">
                  <div className="review-row-poster">
                    <MoviePoster src={posterSrc} alt={entry.movieTitle || 'Movie poster'} />
                  </div>

                  <div className="review-row-info">
                    <div className="review-row-header">
                      <h2 className="review-row-title">
                        {entry.movieTitle || 'Untitled'} {watchedYear && <span className="review-row-year">({watchedYear})</span>}
                      </h2>
                      {formattedDate && <span className="review-row-date">Watched on {formattedDate}</span>}
                    </div>

                    {typeof entry.rating === 'number' && entry.rating > 0 && (
                      <div className="review-row-rating">
                        <RatingStars rating={entry.rating} size={16} />
                      </div>
                    )}

                    <p className="review-row-note">{entry.note}</p>
                  </div>
                </div>
                {index < reviews.length - 1 && <div className="review-row-divider" />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
