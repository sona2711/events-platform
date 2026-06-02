import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { profileReducer, saveProfileToStorage, setAvatarUrl, updateProfileDetails } from './profile'
import type { ProfileState } from './profile'

const profilePersistListener = createListenerMiddleware<{ profile: ProfileState }>()

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(profilePersistListener.middleware),
})

profilePersistListener.startListening({
  matcher: isAnyOf(setAvatarUrl, updateProfileDetails),
  effect: (_, listenerApi) => {
    saveProfileToStorage(listenerApi.getState().profile)
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
