import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { DEFAULT_LANGUAGE } from '@/i18n'
import type { ProfileFormValues } from '@/pages/userProfile/types'
import type { AuthUser } from '@/types'
import { mapAuthUserToProfileIdentity, shouldHydrateProfileFromAuth } from './profileHydration'
import {
  DEFAULT_PROFILE_LOCATION,
  getDefaultProfile,
  loadProfileFromStorage,
} from './profileStorage'
import type { ProfileState } from './profileTypes'

export type { ProfileState } from './profileTypes'

const initialState: ProfileState = loadProfileFromStorage() ?? getDefaultProfile()

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    hydrateFromAuthUser: (state, action: PayloadAction<AuthUser>) => {
      const user = action.payload

      if (!shouldHydrateProfileFromAuth(state.id, user.uid)) {
        if (!state.location.trim()) {
          state.location = DEFAULT_PROFILE_LOCATION
        }
        return
      }

      const identity = mapAuthUserToProfileIdentity(user)
      state.id = identity.id
      state.fullName = identity.fullName
      state.email = identity.email
      state.avatarUrl = identity.avatarUrl
      state.phone = ''
      state.location = DEFAULT_PROFILE_LOCATION
      state.preferredLanguage = DEFAULT_LANGUAGE
    },
    setAvatarUrl: (state, action: PayloadAction<string>) => {
      state.avatarUrl = action.payload
    },
    updateProfileDetails: (state, action: PayloadAction<ProfileFormValues>) => {
      state.fullName = action.payload.fullName
      state.email = action.payload.email
      state.phone = action.payload.phone
      state.location = action.payload.location
      state.preferredLanguage = action.payload.preferredLanguage
    },
  },
})

export const { hydrateFromAuthUser, setAvatarUrl, updateProfileDetails } = profileSlice.actions
export const profileReducer = profileSlice.reducer
export const selectProfile = (state: { profile: ProfileState }): ProfileState => state.profile
