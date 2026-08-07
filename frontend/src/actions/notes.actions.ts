'use server'

import { revalidatePath } from 'next/cache'
import { getTokens } from 'next-firebase-auth-edge'
import { cookies } from 'next/headers'
import { authConfig } from '@/config/auth.config'
import { db } from '@/lib/firebase'
import { NoteInput } from '@/types/notes.types'

async function getUserId(): Promise<string> {
  const tokens = await getTokens(await cookies(), authConfig)
  if (!tokens) throw new Error('Unauthorized')
  return tokens.decodedToken.uid
}

export async function createNoteAction(data: NoteInput) {
  try {
    const userId = await getUserId()
    const now = new Date().toISOString()

    await db.collection('notes').add({
      userId,
      title: data.title,
      content: data.content || '',
      createdAt: now,
      updatedAt: now,
    })

    revalidatePath('/notes')
    return { success: true }
  } catch (error) {
    console.error('Failed to create note:', error)
    throw new Error('Failed to create note')
  }
}

export async function deleteNoteAction(id: string) {
  try {
    const userId = await getUserId()
    const noteRef = db.collection('notes').doc(id)
    const doc = await noteRef.get()

    if (!doc.exists || doc.data()?.userId !== userId) {
      throw new Error('Unauthorized or note not found')
    }

    await noteRef.delete()
    revalidatePath('/notes')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete note:', error)
    throw new Error('Failed to delete note')
  }
}