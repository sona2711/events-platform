import type { FavoritesState } from './favoritesTypes'

export const FAVORITES_STORAGE_KEY = 'events-platform-favorites'

const isFavoritesState = (value: unknown): value is FavoritesState => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const favorites = value as Record<string, unknown>

  return (
    Array.isArray(favorites.eventIds) && favorites.eventIds.every((id) => typeof id === 'string')
  )
}

export const getDefaultFavorites = (): FavoritesState => ({
  eventIds: [],
})

export const loadFavoritesFromStorage = (): FavoritesState | null => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)
    return isFavoritesState(parsed) ? parsed : null
  } catch {
    return null
  }
}

export const saveFavoritesToStorage = (favorites: FavoritesState): void => {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
}
