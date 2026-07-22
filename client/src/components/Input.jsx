/**
 * Input - Reusable form input component.
 *
 * Uses the existing `.form-group`, `.form-label`, `.input-wrapper`,
 * `.form-input`, `.input-error`, `.field-error-text` CSS classes
 * from the design system (style/forms.css).
 *
 * Props:
 *  - id: input element id (required for accessibility)
 *  - label: label text
 *  - error: validation error string (shows error styling + message)
 *  - hint: helper text displayed below input
 *  - className: additional CSS class names for the input
 *  - ...rest: forwarded to the native <input>
 */
export default function Input({
  id,
  label,
  error,
  hint,
  className = '',
  ...rest
}) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="input-wrapper">
        <input
          id={id}
          className={`form-input ${error ? 'input-error' : ''} ${className}`.trim()}
          {...rest}
        />
      </div>
      {error && (
        <span className="field-error-text">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </span>
      )}
      {hint && !error && (
        <span className="input-hint">{hint}</span>
      )}
    </div>
  )
}
