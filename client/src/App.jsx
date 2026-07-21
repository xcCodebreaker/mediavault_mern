import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { Routes, Route, Link } from './main.jsx'
import { useAuth } from './context/AuthContext.jsx'
import './App.css'

function App() {
  const { user, logout } = useAuth()

  return (
    <div className="app-container">
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
                <button onClick={logout} className="btn-nav-logout">
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

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">&copy; 2026 MediaVault. Keep your cinematic memories secure and private.</p>
          <div className="footer-links">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
            <span className="footer-link">&bull;</span>
            <a href="#" className="footer-link">Terms of Service</a>
            <span className="footer-link">&bull;</span>
            <a href="#" className="footer-link">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
