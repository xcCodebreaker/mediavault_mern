import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Search from './pages/Search.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import Diary from './pages/Diary.jsx'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import { Navbar } from './components'
import './App.css'

function App() {
  const { user, logout } = useAuth()

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar user={user} logout={logout} Link={Link} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/diary" element={<Diary />} />
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
    </BrowserRouter>
  )
}

export default App
