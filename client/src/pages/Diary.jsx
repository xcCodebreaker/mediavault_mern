import { useState, useEffect } from 'react'
import { apiRequest } from '../api/client.js'
import { MovieCard, DiaryEntryCard } from '../components'

export default function Diary() {
  const [entries, setEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchDiary() {
      setIsLoading(true)
      setError('')
      try {
        const data = await apiRequest('/api/diary')
        setEntries(data)
      } catch (err) {
        setError(err.message || 'Failed to load diary entries.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDiary()
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
      <div className="diary-page movies-container">
        <h1 className="search-page-title">My Diary</h1>
        <p className="search-page-subtitle">Your personal timeline of watched movies</p>

        {error && (
          <div className="alert alert-error">
            <span className="alert-symbol">!</span>
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
              const posterSrc = entry.posterPath ? `https://image.tmdb.org/t/p/w500${entry.posterPath}` : undefined

              return (
                <div key={entry._id} className="diary-card-container">
                  <MovieCard
                    title={entry.movieTitle}
                    rating={entry.rating}
                    posterSrc={posterSrc}
                    onClick={() => setSelectedEntry(entry)}
                  />
                  <button
                    type="button"
                    className="btn-delete-entry"
                    onClick={() => handleDelete(entry._id)}
                    title="Delete entry"
                  >
                    Delete
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {selectedEntry && (
        <div
          className="diary-entry-overlay-backdrop"
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

