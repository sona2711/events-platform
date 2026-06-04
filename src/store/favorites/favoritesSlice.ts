import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getDefaultFavorites, loadFavoritesFromStorage } from './favoritesStorage'
import type { FavoritesState } from './favoritesTypes'

export type { FavoritesState } from './favoritesTypes'

const initialState: FavoritesState = loadFavoritesFromStorage() ?? getDefaultFavorites()

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const eventId = action.payload
      const index = state.eventIds.indexOf(eventId)

      if (index >= 0) {
        state.eventIds.splice(index, 1)
        return
      }

      state.eventIds.push(eventId)
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer

type FavoritesRootState = { favorites: FavoritesState }

export const selectFavoriteEventIds = (state: FavoritesRootState): string[] =>
  state.favorites.eventIds

export const selectIsEventFavorite =
  (eventId: string) =>
  (state: FavoritesRootState): boolean =>
    state.favorites.eventIds.includes(eventId)
