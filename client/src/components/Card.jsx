/**
 * Card - Reusable glassmorphic card container.
 *
 * Uses the existing `.card` CSS class from the design system
 * (style/components.css).
 *
 * Props:
 *  - children: card content
 *  - className: additional CSS class names
 *  - animate: if true, applies fadeInUp animation (default: false)
 *  - ...rest: forwarded to the native <div>
 */
export default function Card({
  children,
  className = '',
  animate = false,
  ...rest
}) {
  const animationClass = animate ? 'animate-fade-in-up' : ''

  return (
    <div
      className={`card ${animationClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  )
}
