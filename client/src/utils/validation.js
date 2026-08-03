/**
 * Validates an email address.
 * Returns an error message string if invalid, or an empty string if valid.
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email is required'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address'
  }
  return ''
}

/**
 * Validates a password.
 * Returns an error message string if invalid, or an empty string if valid.
 */
export function validatePassword(password) {
  if (!password) {
    return 'Password is required'
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters'
  }
  return ''
}
