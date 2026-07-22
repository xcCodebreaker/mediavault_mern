/**
 * Navbar - Reusable glassmorphic navigation bar.
 *
 * Uses the existing `.navbar`, `.nav-container`, `.logo-link`, `.logo-icon`,
 * `.nav-links`, `.nav-link`, `.nav-user`, `.user-tag`, `.btn-nav-logout`,
 * `.btn-nav-signup` CSS classes from the design system (style/layout.css,
 * style/components.css).
 *
 * Props:
 *  - user: user object (null when logged out)
 *  - onLogout: callback fired when the logout button is clicked
 *  - LinkComponent: the Link component from the router context
 */
export default function Navbar({ user, onLogout, LinkComponent }) {
  const Link = LinkComponent

  return (
    <nav className="navbar animate-fade-in">
      <div className="nav-container">
        <Link to="/" className="logo-link">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {/* Cinematic safe / lock icon combination */}
            <rect x="3" y="3" width="18" height="18" rx="4" ry="4" strokeWidth="2" />
            <circle cx="12" cy="12" r="5" strokeWidth="2" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <path d="M12 7v3" strokeWidth="1.5" />
            <path d="M12 14v3" strokeWidth="1.5" />
            <path d="M7 12h3" strokeWidth="1.5" />
            <path d="M14 12h3" strokeWidth="1.5" />
          </svg>
          <span>MediaVault</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          {user ? (
            <div className="nav-user">
              <span className="user-tag">{user.name}</span>
              <button onClick={onLogout} className="btn-nav-logout">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn-nav-signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
