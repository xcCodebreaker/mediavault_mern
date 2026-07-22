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
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
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
