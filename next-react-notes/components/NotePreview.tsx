import { marked } from 'marked'
import React from 'react'
import sanitizeHtml from 'sanitize-html'

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  'img',
  'h1',
  'h2',
  'h3'
])

const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ['alt', 'src']
  }
)

type Props = {
  children: React.ReactNode
}

export default function NotePreview({ children }: Props) {
  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          // @ts-expect-error md2html
          __html: sanitizeHtml(marked(children || ''), {
            allowedTags,
            allowedAttributes
          })
        }}
      />
    </div>
  )
}

