import { collection, doc, type CollectionReference, type DocumentData } from 'firebase/firestore'
import { getClientDb } from './client'
import type { Note, UserProfile, UserProfile } from '@/types/firestore'
/**
 * Creates a typed Firestore collection reference.
 * Use this factory to add new collections — see docs/FIRESTORE-SCHEMA.md
 */
function typedCollection<T extends DocumentData>(path: string): CollectionReference<T> {
  return collection(getClientDb(), path) as CollectionReference<T>
}

// ── Collections ──────────────────────────────────────────────────────────────
// Add one export per Firestore collection. Keep in sync with:
//   - src/types/firestore.ts
//   - firebase/firestore.rules
//   - docs/FIRESTORE-SCHEMA.md
export interface Note {
  id: string
  uid: string // owner's user id — used by security rules
  title: string
  body: string
  createdAt: Timestamp
  updatedAt: Timestamp
  _schemaVersion: 1
}

export function getUsersCollection() {
  return typedCollection<Note>('notes')
}

export function userDoc(uid: string) {
   return doc(getNotesCollection(), id)
}

export function getNotesCollection() {
  return typedCollection<Note>('notes')
}

export function noteDoc(id: string) {
  return doc(getNotesCollection(), id)
}
