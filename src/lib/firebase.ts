import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'

let app: FirebaseApp | undefined
let authInstance: Auth | undefined
let firestoreInstance: Firestore | undefined

const getFirebaseConfig = () => ({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

export async function getFirebaseAuth(): Promise<Auth> {
  if (authInstance) {
    return authInstance
  }

  const { initializeApp } = await import('firebase/app')
  const { getAuth } = await import('firebase/auth')

  app = initializeApp(getFirebaseConfig())
  authInstance = getAuth(app)

  return authInstance
}

export async function getFirestoreDb(): Promise<Firestore> {
  if (firestoreInstance) {
    return firestoreInstance
  }

  if (!app) {
    await getFirebaseAuth()
  }

  if (!app) {
    throw new Error('Firebase app is not initialized')
  }

  const { getFirestore } = await import('firebase/firestore')

  firestoreInstance = getFirestore(app)
  return firestoreInstance
}
