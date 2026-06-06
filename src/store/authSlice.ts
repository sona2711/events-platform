import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthState, AuthUser } from '@/types'
import { AUTH_ERROR_MESSAGES, toAuthRejectValue } from './authErrors'

const loadFirebaseAuth = async () => {
  const { getFirebaseAuth } = await import('@/lib/firebase')
  return getFirebaseAuth()
}

export const loginWithEmail = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string | null }
>('auth/loginWithEmail', async ({ email, password }, { rejectWithValue }) => {
  try {
    const [{ signInWithEmailAndPassword }, auth] = await Promise.all([
      import('firebase/auth'),
      loadFirebaseAuth(),
    ])
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
  } catch (err) {
    return rejectWithValue(toAuthRejectValue(err, AUTH_ERROR_MESSAGES.loginFailed))
  }
})

export const loginWithGoogle = createAsyncThunk<AuthUser, void, { rejectValue: string | null }>(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const [{ signInWithPopup, GoogleAuthProvider }, auth] = await Promise.all([
        import('firebase/auth'),
        loadFirebaseAuth(),
      ])
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider())
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
    } catch (err) {
      return rejectWithValue(toAuthRejectValue(err, AUTH_ERROR_MESSAGES.googleSignInFailed))
    }
  },
)

export const registerWithEmail = createAsyncThunk<
  AuthUser,
  { email: string; password: string; displayName: string },
  { rejectValue: string | null }
>('auth/registerWithEmail', async ({ email, password, displayName }, { rejectWithValue }) => {
  try {
    const [{ createUserWithEmailAndPassword, updateProfile }, auth] = await Promise.all([
      import('firebase/auth'),
      loadFirebaseAuth(),
    ])
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    const trimmedDisplayName = displayName.trim()

    await updateProfile(user, { displayName: trimmedDisplayName })
    await user.reload()

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ?? trimmedDisplayName,
      photoURL: user.photoURL,
    }
  } catch (err) {
    return rejectWithValue(toAuthRejectValue(err, AUTH_ERROR_MESSAGES.registrationFailed))
  }
})

export const sendPasswordReset = createAsyncThunk<void, string, { rejectValue: string | null }>(
  'auth/sendPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const [{ sendPasswordResetEmail }, auth] = await Promise.all([
        import('firebase/auth'),
        loadFirebaseAuth(),
      ])
      await sendPasswordResetEmail(auth, email)
    } catch (err) {
      return rejectWithValue(toAuthRejectValue(err, AUTH_ERROR_MESSAGES.passwordResetFailed))
    }
  },
)

export const logout = createAsyncThunk<void, void, { rejectValue: string | null }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const [{ signOut }, auth] = await Promise.all([import('firebase/auth'), loadFirebaseAuth()])
      await signOut(auth)
    } catch (err) {
      return rejectWithValue(toAuthRejectValue(err, AUTH_ERROR_MESSAGES.logoutFailed))
    }
  },
)

const initialState: AuthState = {
  user: null,
  loading: false,
  initializing: true,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload
      state.initializing = false
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    const pendingReducer = (state: AuthState) => {
      state.loading = true
      state.error = null
    }
    const rejectedReducer = (
      state: AuthState,
      action: PayloadAction<string | null | undefined>,
    ) => {
      state.loading = false
      if (action.payload) {
        state.error = action.payload
      }
    }

    builder
      .addCase(loginWithEmail.pending, pendingReducer)
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(loginWithEmail.rejected, rejectedReducer)

      .addCase(loginWithGoogle.pending, pendingReducer)
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(loginWithGoogle.rejected, rejectedReducer)

      .addCase(registerWithEmail.pending, pendingReducer)
      .addCase(registerWithEmail.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(registerWithEmail.rejected, rejectedReducer)

      .addCase(sendPasswordReset.pending, pendingReducer)
      .addCase(sendPasswordReset.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(sendPasswordReset.rejected, rejectedReducer)

      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.loading = false
      })
  },
})

export const { setUser, clearError } = authSlice.actions

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading

export default authSlice.reducer
