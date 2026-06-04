export {
  favoritesReducer,
  selectFavoriteEventIds,
  selectIsEventFavorite,
  toggleFavorite,
} from './favoritesSlice'
export type { FavoritesState } from './favoritesTypes'
export {
  FAVORITES_STORAGE_KEY,
  getDefaultFavorites,
  loadFavoritesFromStorage,
  saveFavoritesToStorage,
} from './favoritesStorage'
