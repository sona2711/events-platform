import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import type { AuthState, AuthUser } from '@/types'

const googleProvider = new GoogleAuthProvider()

export const loginWithEmail = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/loginWithEmail', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : 'Login failed')
  }
})

export const loginWithGoogle = createAsyncThunk<AuthUser, void, { rejectValue: string }>(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider)
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Google sign-in failed')
    }
  },
)

export const registerWithEmail = createAsyncThunk<
  AuthUser,
  { email: string; password: string; displayName: string },
  { rejectValue: string }
>('auth/registerWithEmail', async ({ email, password, displayName }, { rejectWithValue }) => {
  try {
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
    return rejectWithValue(err instanceof Error ? err.message : 'Registration failed')
  }
})

export const sendPasswordReset = createAsyncThunk<void, string, { rejectValue: string }>(
  'auth/sendPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Password reset failed')
    }
  },
)

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth)
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Logout failed')
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
    const rejectedReducer = (state: AuthState, action: PayloadAction<string | undefined>) => {
      state.loading = false
      state.error = action.payload ?? 'An unexpected error occurred'
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
export default authSlice.reducer
