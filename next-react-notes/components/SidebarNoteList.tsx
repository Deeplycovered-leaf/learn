import SidebarNoteListFilter from '@/components/SidebarNoteListFilter';
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader';
import { getAllNotes } from '@/lib/redis';
import { sleep } from '@/utils';

export default async function SidebarNoteList() {

  await sleep(1000)
  const notes = await getAllNotes()

  if (Object.entries(notes).length == 0) {
    return <div className="notes-empty">
      {'No notes created yet!'}
    </div>
  }

  return (
    <SidebarNoteListFilter notes = {
      Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note)
        return {
          noteId,
          note: noteData,
          header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />
        }
      })
    } />
  )
}