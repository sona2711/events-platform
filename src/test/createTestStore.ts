import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/store/authSlice'
import { favoritesReducer } from '@/store/favorites'
import { paidBookingsReducer } from '@/store/paidBookings'
import { profileReducer } from '@/store/profile'

export const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      profile: profileReducer,
      favorites: favoritesReducer,
      paidBookings: paidBookingsReducer,
    },
  })

export type TestStore = ReturnType<typeof createTestStore>
