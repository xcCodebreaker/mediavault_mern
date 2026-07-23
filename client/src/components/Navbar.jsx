import { Link } from 'react-router-dom'

export default function Navbar({ user, onLogout, LinkComponent }) {
  const LinkToUse = LinkComponent || Link

  return (
    <nav className="navbar animate-fade-in">
      <div className="nav-container">
        <LinkToUse to="/" className="logo-link">
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
        </LinkToUse>

        <div className="nav-links">
          <LinkToUse to="/" className="nav-link">Home</LinkToUse>
          {user ? (
            <div className="nav-user">
              <span className="user-tag">{user.name}</span>
              <button onClick={onLogout} className="btn-nav-logout">
                Logout
              </button>
            </div>
          ) : (
            <>
              <LinkToUse to="/login" className="nav-link">Login</LinkToUse>
              <LinkToUse to="/signup" className="btn-nav-signup">Sign Up</LinkToUse>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
