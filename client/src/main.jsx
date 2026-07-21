import { StrictMode, createContext, useContext, useState, useEffect, Children } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'

// Custom Router Context and Components to avoid parent dependency double-React issue
export const RouterContext = createContext()

export function BrowserRouter({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (to) => {
    window.history.pushState({}, '', to)
    setCurrentPath(to)
  }

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useNavigate() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useNavigate must be used within a BrowserRouter')
  }
  return context.navigate
}

export function Link({ to, children, ...props }) {
  const { navigate } = useContext(RouterContext)
  
  const handleClick = (e) => {
    e.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export function Routes({ children }) {
  const { currentPath } = useContext(RouterContext)
  
  let match = null
  Children.forEach(children, (child) => {
    if (child && child.props.path === currentPath) {
      match = child.props.element
    }
  })
  
  return match
}

export function Route({ path, element }) {
  return null
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
