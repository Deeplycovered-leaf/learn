'use server'

import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/redis';
import { z } from 'zod';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(100, '字数最大 100'),
})

export async function saveNote(prevState: unknown, formData: FormData) {
  const noteId = formData.get('noteId')
  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date()
  }

  console.log('formData.title() =>',data)
  console.log('formData.body() =>',formData.get('body'))
  console.log('formData.noteId() =>',formData.get('noteId'))

  const validated = schema.safeParse(data)

  if (!validated.success) {
    return {
      errors: validated.error.issues
    }
  }

  await sleep(1000)
  if (noteId) {
    await updateNote(noteId, JSON.stringify(data))
    // nextjs 14 revalidatePath
    // revalidatePath('/', 'layout')
  } else {
    await addNote(JSON.stringify(data))
  }

  return {
    message: 'Add Success!'
  }
}

export async function deleteNote(prevState: unknown, formData: FormData) {
  const noteId = formData.get('noteId')
  if (!noteId) {
    throw new Error('Note ID is required')
  }
  delNote(noteId as string)
  // nextjs 14 revalidatePath
  // revalidatePath('/', 'layout')
  redirect('/')
}
