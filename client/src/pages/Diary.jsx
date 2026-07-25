import { useState, useEffect } from 'react'
import { apiRequest } from '../api/client.js'
import { MovieCard } from '../components'

export default function Diary() {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchDiary() {
      setIsLoading(true)
      setError('')
      try {
        const data = await apiRequest('/api/diary')
        if (isMounted) {
          setEntries(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load diary entries.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchDiary()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="diary-page movies-container animate-fade-in-up">
      <h1 className="search-page-title">My Diary</h1>
      <p className="search-page-subtitle">Your personal timeline of watched movies</p>

      {error && (
        <div className="alert alert-error">
          <svg className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="search-loading">
          <div className="spinner"></div>
          <span>Loading diary entries...</span>
        </div>
      )}

      {!isLoading && !error && entries.length === 0 && (
        <div className="search-empty">
          <p className="search-empty-text">No diary entries yet.</p>
        </div>
      )}

      {!isLoading && entries.length > 0 && (
        <div className="movies-grid">
          {entries.map((entry) => {
            const year = entry.watchedDate ? new Date(entry.watchedDate).getFullYear() : undefined
            const posterSrc = entry.posterPath ? `https://image.tmdb.org/t/p/w500${entry.posterPath}` : undefined

            return (
              <MovieCard
                key={entry._id}
                title={entry.movieTitle}
                year={year}
                rating={entry.rating}
                posterSrc={posterSrc}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
