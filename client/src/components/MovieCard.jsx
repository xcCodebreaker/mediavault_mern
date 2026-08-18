import MoviePoster from './MoviePoster.jsx'
import RatingStars from './RatingStars.jsx'

/**
 * MovieCard - Reusable movie card with poster, title, metadata, and rating.
 *
 * Uses the existing `.movie-card`, `.movie-poster-wrapper`, `.movie-overlay`,
 * `.movie-badge`, `.movie-rating`, `.movie-rating-star`, `.movie-info`,
 * `.movie-title`, `.movie-meta`, `.movie-year`, `.movie-genre` CSS classes
 * from the design system (style/movies.css).
 *
 * Props:
 *  - title: movie title
 *  - year: release year
 *  - genre: genre label
 *  - posterSrc: poster image URL
 *  - posterAlt: alt text for the poster image
 *  - rating: numeric rating (0-5 or 0-10 depending on usage)
 *  - badge: optional badge text (e.g. "HD", "New")
 *  - onClick: click handler for the card
 *  - className: additional CSS class names
 */
export default function MovieCard({
  title,
  year,
  genre,
  posterSrc,
  posterAlt,
  rating,
  badge,
  onClick,
  className = '',
}) {
  return (
    <div
      className={`movie-card ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e) } : undefined}
    >
      <div className="movie-poster-wrapper">
        <MoviePoster src={posterSrc} alt={posterAlt || title} />
        <div className="movie-overlay"></div>

        {badge && (
          <span className="movie-badge">{badge}</span>
        )}

        {rating != null && (
          <div className="movie-rating">
            <span className="movie-rating-star">★</span>
            <span>{rating}</span>
          </div>
        )}
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-meta">
          {year && <span className="movie-year">{year}</span>}
          {genre && <span className="movie-genre">{genre}</span>}
        </div>
      </div>
    </div>
  )
}
