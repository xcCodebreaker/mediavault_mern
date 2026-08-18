import { useState } from 'react'

/**
 * MoviePoster - Reusable movie poster image with fallback.
 *
 * Uses the `.movie-poster` and `.movie-poster-fallback` CSS classes
 * from the main stylesheet (style/main.css).
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
