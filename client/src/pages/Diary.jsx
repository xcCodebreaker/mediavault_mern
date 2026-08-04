import { useState, useEffect } from 'react'
import { apiRequest } from '../api/client.js'
import { MovieCard, DiaryEntryCard } from '../components'

export default function Diary() {
  const [entries, setEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
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

  useEffect(() => {
    if (!selectedEntry) return

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setSelectedEntry(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedEntry])

  async function handleDelete(id) {
    const confirmed = window.confirm('Are you sure you want to delete this diary entry?')
    if (!confirmed) return

    try {
      await apiRequest(`/api/diary/${id}`, { method: 'DELETE' })
      setEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== id))
      if (selectedEntry && selectedEntry._id === id) {
        setSelectedEntry(null)
      }
    } catch (err) {
      alert(err.message || 'Failed to delete entry.')
    }
  }

  return (
    <>
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
                <div key={entry._id} className="diary-card-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <MovieCard
                    title={entry.movieTitle}
                    year={year}
                    rating={entry.rating}
                    posterSrc={posterSrc}
                    onClick={() => setSelectedEntry(entry)}
                  />
                  <button
                    type="button"
                    className="btn-delete-entry"
                    onClick={() => handleDelete(entry._id)}
                    title="Delete entry"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      width: '100%',
                      padding: '6px 12px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: '#f87171',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {selectedEntry && (
        <div
          className="diary-overlay"
          onClick={() => setSelectedEntry(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Diary entry overlay"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <DiaryEntryCard
              entry={selectedEntry}
              onClose={() => setSelectedEntry(null)}
            />
          </div>
        </div>
      )}
    </>
  )
}

