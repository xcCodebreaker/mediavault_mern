/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, Children } from 'react'

export const RouterContext = createContext(null)

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
  const context = useContext(RouterContext)
  
  const handleClick = (e) => {
    e.preventDefault()
    if (context && context.navigate) {
      context.navigate(to)
    }
  }

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export function Routes({ children }) {
  const context = useContext(RouterContext)
  const currentPath = context ? context.currentPath : window.location.pathname
  
  let match = null
  Children.forEach(children, (child) => {
    if (child && child.props && child.props.path === currentPath) {
      match = child.props.element
    }
  })
  
  return match
}

export function Route() {
  return null
}
