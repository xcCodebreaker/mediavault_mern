/**
 * Button - Reusable button component.
 *
 * Uses the existing `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`
 * CSS classes from the design system (style/components.css).
 *
 * Props:
 *  - variant: 'primary' | 'secondary' | 'outline' (default: 'primary')
 *  - children: button content
 *  - isLoading: shows spinner when true
 *  - loadingText: text shown alongside spinner (default: 'Loading...')
 *  - className: additional CSS class names
 *  - ...rest: forwarded to the native <button>
 */
export default function Button({
  variant = 'primary',
  children,
  isLoading = false,
  loadingText = 'Loading...',
  className = '',
  disabled,
  ...rest
}) {
  const variantClass = variant === 'secondary'
    ? 'btn-secondary'
    : variant === 'outline'
      ? 'btn-outline'
      : 'btn-primary'

  return (
    <button
      className={`btn ${variantClass} ${className}`.trim()}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <div className="spinner"></div>
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
