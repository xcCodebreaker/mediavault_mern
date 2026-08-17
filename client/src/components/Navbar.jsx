import { Link as RouterLink } from 'react-router-dom'

export default function Navbar({ user, logout, Link = RouterLink }) {
  return (
    <nav className="navbar">
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
            <>
              <Link to="/search" className="nav-link">Search</Link>
              <Link to="/diary" className="nav-link">My Diary</Link>
              <Link to="/reviews" className="nav-link">Reviews</Link>
              <div className="nav-user">
                <span className="user-tag">{user.name}</span>
                <button onClick={logout} className="btn-nav-logout">
                  Logout
                </button>
              </div>
            </>
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
