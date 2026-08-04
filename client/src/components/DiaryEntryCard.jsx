import MoviePoster from './MoviePoster.jsx'
import RatingStars from './RatingStars.jsx'

/**
 * DiaryEntryCard - Reusable card component for displaying a movie diary entry.
 *
 * Props:
 *  - title: movie title (string)
 *  - year: release year (number or string)
 *  - posterSrc: poster image URL (string)
 *  - rating: numeric rating from 0-5 (number)
 *  - rewatch: whether this is a rewatch (boolean)
 *  - note: personal note/review (string)
 *  - watchedDate: date when the movie was logged/watched
 *  - className: additional CSS class names
 */
export default function DiaryEntryCard({
  title,
  year,
  posterSrc,
  rating,
  rewatch,
  note,
  watchedDate,
  className = '',
}) {
  const hasNote = typeof note === 'string' && note.trim().length > 0
  const hasRating = typeof rating === 'number' && rating > 0

  return (
    <div className={`diary-entry-card ${className}`.trim()}>
      <MoviePoster src={posterSrc} alt={title} />

      <h3 className="diary-entry-title">
        {title}
        {year && <span className="diary-entry-year"> ({year})</span>}
      </h3>

      {hasRating && (
        <div className="diary-entry-rating">
          <RatingStars rating={rating} />
        </div>
      )}

      {rewatch && (
        <span className="diary-entry-badge">Rewatch</span>
      )}

      {hasNote && (
        <p className="diary-entry-note">{note}</p>
      )}
    </div>
  )
}
