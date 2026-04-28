import { useEffect, useState } from 'react'
import { FavoritesContext } from './favoritesStore'

const FAVORITES_STORAGE_KEY = 'bubilet-favorites'

const getInitialFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!stored) {
      return []
    }
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState(getInitialFavorites)

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  const toggleFavorite = (eventId) => {
    setFavoriteIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId],
    )
  }

  const isFavorite = (eventId) => favoriteIds.includes(eventId)

  const value = {
    favoriteIds,
    toggleFavorite,
    isFavorite,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
