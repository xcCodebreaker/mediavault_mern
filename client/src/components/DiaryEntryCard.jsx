import MoviePoster from './MoviePoster.jsx'
import RatingStars from './RatingStars.jsx'

/**
 * DiaryEntryCard - Small, self-contained read-only detail box for a diary entry.
 *
 * Props:
 *  - entry: full diary entry object ({ movieTitle, posterPath, watchedDate, rating, note, ... })
 *  - onClose: callback function invoked when close button is clicked
 */
export default function DiaryEntryCard({ entry, onClose }) {
  if (!entry) return null

  const {
    movieTitle,
    posterPath,
    watchedDate,
    rating,
    note,
  } = entry

  const posterSrc = posterPath
    ? (posterPath.startsWith('http') ? posterPath : `https://image.tmdb.org/t/p/w200${posterPath}`)
    : null

  const formattedDate = watchedDate
    ? new Date(watchedDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  const hasRating = typeof rating === 'number' && rating > 0
  const hasNote = typeof note === 'string' && note.trim().length > 0

  return (
    <div className="diary-entry-detail-box">
      {onClose && (
        <button
          type="button"
          className="diary-entry-close-btn"
          onClick={onClose}
          aria-label="Close detail box"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <div className="diary-entry-header">
        <div className="diary-entry-poster-thumb">
          <MoviePoster src={posterSrc} alt={movieTitle || 'Movie poster'} />
        </div>

        <div className="diary-entry-meta">
          <h3 className="diary-entry-title">{movieTitle || 'Untitled'}</h3>
          {formattedDate && (
            <span className="diary-entry-date">Watched on {formattedDate}</span>
          )}
        </div>
      </div>

      {hasRating && (
        <div className="diary-entry-rating">
          <RatingStars rating={rating} size={16} />
        </div>
      )}

      {hasNote && (
        <p className="diary-entry-detail-note">{note}</p>
      )}
    </div>
  )
}
