import { configureStore, createAction, createListenerMiddleware } from '@reduxjs/toolkit'
import type { AuthUser } from '@/types'
import { mapAuthUserToProfileIdentity, shouldHydrateProfileFromAuth } from './profileHydration'
import {
  DEFAULT_PROFILE_LOCATION,
  getDefaultProfile,
  loadProfileFromStorage,
  PROFILE_STORAGE_KEY,
  saveProfileToStorage,
} from './profileStorage'
import type { ProfileState } from './profileTypes'
import { hydrateFromAuthUser, profileReducer, updateProfileDetails } from './profileSlice'

const authUser: AuthUser = {
  uid: 'GZTYzVBmv8RfSJOaTSXvWKdN3js2',
  email: 'mkrtchyansona77@gmail.com',
  displayName: 'Sona Mkrtchyan',
  photoURL: 'https://lh3.googleusercontent.com/a/example-photo',
  isAdmin: false,
}

describe('profileHydration', () => {
  it('maps auth user fields to profile identity', () => {
    expect(mapAuthUserToProfileIdentity(authUser)).toEqual({
      id: authUser.uid,
      fullName: 'Sona Mkrtchyan',
      email: authUser.email,
      avatarUrl: authUser.photoURL,
    })
  })

  it('uses email local part when display name is missing', () => {
    expect(
      mapAuthUserToProfileIdentity({
        ...authUser,
        displayName: null,
      }).fullName,
    ).toBe('mkrtchyansona77')
  })

  it('requires hydration when profile id differs from auth uid', () => {
    expect(shouldHydrateProfileFromAuth('', authUser.uid)).toBe(true)
    expect(shouldHydrateProfileFromAuth('user-1', authUser.uid)).toBe(true)
    expect(shouldHydrateProfileFromAuth(authUser.uid, authUser.uid)).toBe(false)
  })
})

describe('profileReducer hydration', () => {
  it('hydrates identity fields from auth user when profile id differs', () => {
    const state = getDefaultProfile()
    const next = profileReducer(state, hydrateFromAuthUser(authUser))

    expect(next.id).toBe(authUser.uid)
    expect(next.fullName).toBe('Sona Mkrtchyan')
    expect(next.email).toBe(authUser.email)
    expect(next.avatarUrl).toBe(authUser.photoURL)
    expect(next.phone).toBe('')
    expect(next.location).toBe(DEFAULT_PROFILE_LOCATION)
    expect(next.preferredLanguage).toBe('en')
  })

  it('backfills empty location when hydrating same auth user', () => {
    const state = {
      ...getDefaultProfile(),
      id: authUser.uid,
      fullName: 'Sona Mkrtchyan',
      email: authUser.email ?? '',
      avatarUrl: authUser.photoURL ?? '',
      location: '',
      preferredLanguage: 'en' as const,
    }

    const next = profileReducer(state, hydrateFromAuthUser(authUser))

    expect(next.location).toBe(DEFAULT_PROFILE_LOCATION)
    expect(next.fullName).toBe('Sona Mkrtchyan')
    expect(next.email).toBe(authUser.email)
  })

  it('does not overwrite identity when profile id matches auth uid', () => {
    const state = {
      ...getDefaultProfile(),
      id: authUser.uid,
      fullName: 'Locally Edited Name',
      email: 'edited@example.com',
      avatarUrl: 'data:image/png;base64,edited',
      phone: '+374 99 000 000',
      location: 'Yerevan, Armenia',
      preferredLanguage: 'hy' as const,
    }

    const next = profileReducer(state, hydrateFromAuthUser(authUser))

    expect(next.fullName).toBe('Locally Edited Name')
    expect(next.email).toBe('edited@example.com')
    expect(next.avatarUrl).toBe('data:image/png;base64,edited')
    expect(next.phone).toBe('+374 99 000 000')
    expect(next.location).toBe('Yerevan, Armenia')
    expect(next.preferredLanguage).toBe('hy')
  })
})

describe('updateProfileDetails', () => {
  it('persists location with other profile fields', () => {
    const state = getDefaultProfile()
    const next = profileReducer(
      state,
      updateProfileDetails({
        fullName: 'Test User',
        email: 'test@example.com',
        phone: '+374 91 123 456',
        location: 'Kotayk',
        preferredLanguage: 'en',
      }),
    )

    expect(next.fullName).toBe('Test User')
    expect(next.email).toBe('test@example.com')
    expect(next.phone).toBe('+374 91 123 456')
    expect(next.location).toBe('Kotayk')
    expect(next.preferredLanguage).toBe('en')
  })
})

describe('loadProfileFromStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('backfills empty location from stored profile', () => {
    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({
        ...getDefaultProfile(),
        id: authUser.uid,
        fullName: 'Sona Mkrtchyan',
        location: '',
      }),
    )

    expect(loadProfileFromStorage()?.location).toBe(DEFAULT_PROFILE_LOCATION)
  })
})

describe('auth-profile sync listener', () => {
  const setUser = createAction<AuthUser>('auth/setUser')

  beforeEach(() => {
    localStorage.clear()
  })

  it('hydrates and persists profile when setUser is dispatched', () => {
    const listener = createListenerMiddleware<{ profile: ProfileState }>()

    listener.startListening({
      actionCreator: setUser,
      effect: (action, listenerApi) => {
        listenerApi.dispatch(hydrateFromAuthUser(action.payload))
        saveProfileToStorage(listenerApi.getState().profile)
      },
    })

    const store = configureStore({
      reducer: {
        profile: profileReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listener.middleware),
      preloadedState: {
        profile: getDefaultProfile(),
      },
    })

    store.dispatch(setUser(authUser))

    const profile = store.getState().profile
    expect(profile.fullName).toBe('Sona Mkrtchyan')
    expect(profile.email).toBe(authUser.email)

    const stored = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) ?? '{}')
    expect(stored.fullName).toBe('Sona Mkrtchyan')
    expect(stored.id).toBe(authUser.uid)
  })
})
