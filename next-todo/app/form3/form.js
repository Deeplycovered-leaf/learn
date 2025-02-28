'use client'
 
import { useFormStatus } from 'react-dom'
import { createToDo } from 'actions/form3';
import React from 'react';

const initialState = {
  message: '',
}
 
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? 'Adding' : 'Add'}
    </button>
  )
}

export default function AddToDoForm() {
  const [state, formAction] = React.useActionState(createToDo, initialState)
 
  return (
    <form action={formAction}>
      <input type="text" name="todo" />
      <SubmitButton />
      <p aria-live="polite" >
        {state?.message}
      </p>
    </form>
  )
}
