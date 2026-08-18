/**
 * RatingStars - Reusable star rating display / input component.
 *
 * Uses `.rating-stars`, `.rating-star`, `.rating-star-filled`,
 * `.rating-star-interactive` CSS classes defined in
 * style/main.css.
 *
 * Props:
 *  - rating: current rating value (0-5)
 *  - maxStars: total number of stars (default: 5)
 *  - onChange: callback(newRating) — if provided, stars become interactive
 *  - size: star size in px (default: 20)
 *  - className: additional CSS class names
 */
import { useState } from 'react'

export default function RatingStars({
  rating = 0,
  maxStars = 5,
  onChange,
  size = 20,
  className = '',
}) {
  const [hoverRating, setHoverRating] = useState(0)
  const isInteractive = typeof onChange === 'function'
  const displayRating = hoverRating || rating

  const starNumbers = []
  for (let i = 1; i <= maxStars; i++) {
    starNumbers.push(i)
  }

  return (
    <div
      className={className ? `rating-stars ${className}` : 'rating-stars'}
      role={isInteractive ? 'radiogroup' : 'img'}
      aria-label={isInteractive ? 'Rating selection' : `Rating: ${rating} out of ${maxStars} stars`}
    >
      {starNumbers.map((starValue) => {
        const isFilled = starValue <= displayRating

        let starClassName = 'rating-star'
        if (isFilled && isInteractive) {
          starClassName = 'rating-star rating-star-filled rating-star-interactive'
        } else if (isFilled) {
          starClassName = 'rating-star rating-star-filled'
        } else if (isInteractive) {
          starClassName = 'rating-star rating-star-interactive'
        }

        return (
          <button
            key={starValue}
            type="button"
            className={starClassName}
            style={{ width: size, height: size }}
            onClick={isInteractive ? () => onChange(starValue) : undefined}
            onMouseEnter={isInteractive ? () => setHoverRating(starValue) : undefined}
            onMouseLeave={isInteractive ? () => setHoverRating(0) : undefined}
            disabled={!isInteractive}
            tabIndex={isInteractive ? 0 : -1}
            role={isInteractive ? 'radio' : 'presentation'}
            aria-checked={isInteractive ? starValue === rating : undefined}
            aria-label={isInteractive ? `${starValue} star${starValue > 1 ? 's' : ''}` : undefined}
          >
            <svg viewBox="0 0 24 24" width={size} height={size}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        )
      })}
    </div>
  )
}
