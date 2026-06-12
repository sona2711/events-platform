import { ADMINS_COLLECTION } from './adminsConsts'

export async function checkIsAdmin(uid: string): Promise<boolean> {
  try {
    const [{ doc, getDoc }, { getFirestoreDb }] = await Promise.all([
      import('firebase/firestore'),
      import('@/lib/firebase'),
    ])

    const db = await getFirestoreDb()
    const adminDoc = await getDoc(doc(db, ADMINS_COLLECTION, uid))

    return adminDoc.exists()
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[checkIsAdmin] Failed to read admins document:', error)
    }
    return false
  }
}
