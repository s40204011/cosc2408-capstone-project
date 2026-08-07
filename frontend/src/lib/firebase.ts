import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { authConfig } from '@/config/auth.config'

if (!getApps().length) {
  initializeApp({
    credential: cert(authConfig.serviceAccount),
  })
}

export const db = getFirestore()