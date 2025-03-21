// components/EditButton.js
import Link from 'next/link'
import React from 'react';

type Props = {
  noteId?: string
  children: React.ReactNode
}

export default function EditButton({ noteId, children }: Props) {
  const isDraft = !!noteId;
  return (
    <Link href={`/note/edit/${noteId || ''}`} className="link--unstyled">
      <button
        className={[
          'edit-button',
          isDraft ? 'edit-button--solid' : 'edit-button--outline',
        ].join(' ')}
        role="menuitem">
        {children}
      </button>
    </Link>
  );
}
