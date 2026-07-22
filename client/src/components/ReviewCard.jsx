import RatingStars from './RatingStars.jsx'

/**
 * ReviewCard - Reusable card for displaying a user review.
 *
 * Uses the existing `.card` CSS class from the design system
 * (style/components.css) plus `.review-card`, `.review-header`,
 * `.review-author`, `.review-avatar`, `.review-author-info`,
 * `.review-author-name`, `.review-date`, `.review-body` from
 * style/reusable-components.css.
 *
 * Props:
 *  - author: reviewer name
 *  - date: review date string
 *  - rating: numeric rating (0-5)
 *  - children: review body text / content
 *  - avatarUrl: optional avatar image URL
 *  - className: additional CSS class names
 */
export default function ReviewCard({
  author,
  date,
  rating,
  children,
  avatarUrl,
  className = '',
}) {
  // Generate initials from author name for avatar fallback
  const initials = author
    ? author.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <div className={`card review-card ${className}`.trim()}>
      <div className="review-header">
        <div className="review-author">
          {avatarUrl ? (
            <img className="review-avatar" src={avatarUrl} alt={author} />
          ) : (
            <div className="review-avatar review-avatar-fallback">
              {initials}
            </div>
          )}
          <div className="review-author-info">
            <span className="review-author-name">{author}</span>
            {date && <span className="review-date">{date}</span>}
          </div>
        </div>
        {rating != null && (
          <RatingStars rating={rating} size={16} />
        )}
      </div>
      {children && (
        <div className="review-body">
          {children}
        </div>
      )}
    </div>
  )
}
