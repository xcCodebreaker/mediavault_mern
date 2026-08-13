import { useState } from 'react'

/**
 * MoviePoster - Reusable movie poster image with fallback.
 *
 * Uses the existing `.movie-poster` CSS class from the design system
 * (style/movies.css) and `.movie-poster-fallback` from the new
 * reusable component styles.
 *
 * Props:
 *  - src: image source URL
 *  - alt: alt text for the image
 *  - className: additional CSS class names
 */
export default function MoviePoster({
  src,
  alt = 'Movie poster',
  className = '',
}) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className={`movie-poster movie-poster-fallback ${className}`.trim()}>
        <span>No Poster</span>
      </div>
    )
  }

  return (
    <img
      className={`movie-poster ${className}`.trim()}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  )
}
