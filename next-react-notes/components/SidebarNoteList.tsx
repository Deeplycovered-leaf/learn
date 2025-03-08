import { getAllNotes } from "@/lib/redis"
import SidebarNoteItem from "./SidebarNoteItem"

export default async function SidebarNoteList() {
  const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));
  await sleep(1000);
  const notes:Record<string, string> =  await getAllNotes() 
  const arr = Object.entries(notes)

  if (arr.length === 0) {
    return <div className="notes-empty">
      No notes created yet!
    </div>
  }

  return <ul>
    {arr.map(([noteId, note]) => {
      return <li key={noteId}>
        <header className="notes-list">
          <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
        </header>
      </li>
    })}
  </ul>
};
