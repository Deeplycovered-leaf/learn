'use client'

import React from 'react'
import NotePreview from '@/components/NotePreview'
import { deleteNote, saveNote } from '@/actions';
import SaveButton from './SaveButton';
import DeleteButton from './DeleteButton';

type Props = {
  noteId: string | null
  initialTitle: string
  initialBody: string
}

type SaveState = {
  message?: string;
  errors?: Array<{
    message: string;
  }>;
}
const initialState: SaveState = {
  message: '',
}


export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody
}: Props) {

  const [saveState, saveFormAction] = React.useActionState(saveNote, initialState);
  const [, delFormAction] = React.useActionState(deleteNote, initialState);

  const [title, setTitle] = React.useState(initialTitle)
  const [body, setBody] = React.useState(initialBody)

  const isDraft = !noteId

  React.useEffect(() => {
    if (saveState.errors) {
      console.log('saveState.errors =>',saveState.errors);
    }
  }, [saveState])
  
  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <input type="hidden" name="noteId" value={noteId || ''} />
        <div className="note-editor-menu" role="menubar">
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className="note-editor-menu">
          { saveState?.message }
          { saveState.errors && saveState.errors[0].message }
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          name="body"
          value={body}
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  )
}
