export interface Note {
  id: string
  userId?: string
  title: string
  content?: string
  body?: string
  createdAt?: string
  updatedAt?: string
}
export interface NoteInput {
  title: string
  content?: string
  body?: string
}

export interface UserProfile {
  uid: string
  email: string
  displayName?: string | null
  photoURL?: string | null  
  createdAt?: string
  updatedAt?: string
  role?: string
  _schemaVersion?: number
}