/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, Children } from 'react'

export const RouterContext = createContext(null)
export const ParamsContext = createContext({})

/**
 * Match a route pattern against the current path.
 * Supports static paths (e.g. "/search") and parameterized
 * segments (e.g. "/movie/:id"). Returns null on no match,
 * or an object of extracted params on match.
 */
function matchPath(pattern, pathname) {
  const patternParts = pattern.split('/').filter(Boolean)
  const pathParts = pathname.split('/').filter(Boolean)

  if (patternParts.length !== pathParts.length) {
    return null
  }

  const params = {}
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = decodeURIComponent(pathParts[i])
    } else if (patternParts[i] !== pathParts[i]) {
      return null
    }
  }
  return params
}

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

export function useCurrentPath() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useCurrentPath must be used within a BrowserRouter')
  }
  return context.currentPath
}

export function useParams() {
  return useContext(ParamsContext)
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
  let matchedParams = {}

  Children.forEach(children, (child) => {
    if (!child || !child.props || match) return
    const result = matchPath(child.props.path, currentPath)
    if (result !== null) {
      matchedParams = result
      match = child.props.element
    }
  })
  
  if (!match) return null

  return (
    <ParamsContext.Provider value={matchedParams}>
      {match}
    </ParamsContext.Provider>
  )
}

export function Route() {
  return null
}
