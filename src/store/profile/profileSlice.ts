import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProfileFormValues } from '@/pages/userProfile/types'
import { getDefaultProfile, loadProfileFromStorage } from './profileStorage'
import type { ProfileState } from './profileTypes'

export type { ProfileState } from './profileTypes'

const initialState: ProfileState = loadProfileFromStorage() ?? getDefaultProfile()

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAvatarUrl: (state, action: PayloadAction<string>) => {
      state.avatarUrl = action.payload
    },
    updateProfileDetails: (state, action: PayloadAction<ProfileFormValues>) => {
      state.fullName = action.payload.fullName
      state.email = action.payload.email
      state.phone = action.payload.phone
      state.preferredLanguage = action.payload.preferredLanguage
    },
  },
})

export const { setAvatarUrl, updateProfileDetails } = profileSlice.actions
export const profileReducer = profileSlice.reducer
export const selectProfile = (state: { profile: ProfileState }): ProfileState => state.profile
