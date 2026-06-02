import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { favoritesReducer, saveFavoritesToStorage, toggleFavorite } from './favorites'
import type { FavoritesState } from './favorites'
import { profileReducer, saveProfileToStorage, setAvatarUrl, updateProfileDetails } from './profile'
import type { ProfileState } from './profile'

const persistListener = createListenerMiddleware<{
  auth: ReturnType<typeof authReducer>
  profile: ProfileState
  favorites: FavoritesState
}>()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(persistListener.middleware),
})

persistListener.startListening({
  matcher: isAnyOf(setAvatarUrl, updateProfileDetails),
  effect: (_, listenerApi) => {
    saveProfileToStorage(listenerApi.getState().profile)
  },
})

persistListener.startListening({
  matcher: isAnyOf(toggleFavorite),
  effect: (_, listenerApi) => {
    saveFavoritesToStorage(listenerApi.getState().favorites)
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
