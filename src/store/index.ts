import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import authReducer, {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
  setUser,
} from './authSlice'
import { favoritesReducer, saveFavoritesToStorage, toggleFavorite } from './favorites'
import type { FavoritesState } from './favorites'
import {
  hydrateFromAuthUser,
  profileReducer,
  saveProfileToStorage,
  setAvatarUrl,
  updateProfileDetails,
} from './profile'
import type { ProfileState } from './profile'
import { markAsPaid, paidBookingsReducer, savePaidEventIdsToStorage } from './paidBookings'
import type { AuthUser } from '@/types'

const persistListener = createListenerMiddleware<{
  auth: ReturnType<typeof authReducer>
  profile: ProfileState
  favorites: FavoritesState
  paidBookings: ReturnType<typeof paidBookingsReducer>
}>()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    favorites: favoritesReducer,
    paidBookings: paidBookingsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(persistListener.middleware),
})

const isAuthUser = (payload: unknown): payload is AuthUser =>
  Boolean(payload && typeof payload === 'object' && 'uid' in payload)

persistListener.startListening({
  matcher: isAnyOf(
    setUser,
    loginWithEmail.fulfilled,
    loginWithGoogle.fulfilled,
    registerWithEmail.fulfilled,
  ),
  effect: (action, listenerApi) => {
    if (!('payload' in action)) {
      return
    }

    const user = action.payload

    if (!isAuthUser(user)) {
      return
    }

    listenerApi.dispatch(hydrateFromAuthUser(user))
    saveProfileToStorage(listenerApi.getState().profile)
  },
})

persistListener.startListening({
  matcher: isAnyOf(setAvatarUrl, updateProfileDetails, hydrateFromAuthUser),
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

persistListener.startListening({
  matcher: isAnyOf(markAsPaid),
  effect: (_, listenerApi) => {
    savePaidEventIdsToStorage(listenerApi.getState().paidBookings.eventIds)
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
