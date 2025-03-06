import { Note } from "@/types"
import dayjs from "dayjs"

type Props = {
  notes: Record<string, string>
}

export default async function SidebarNoteList(props: Props) {
  const arr = Object.entries(props.notes)

  if (arr.length === 0) {
    return <div className="notes-empty">
      No notes created yet!
    </div>
  }

  return <ul>
    {arr.map(([noteId, note]) => {
      const { title, updateTime } = JSON.parse(note) as Note;

      return <li key={noteId}>
        <header className="notes-list">
          <strong>{title}</strong>
          <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
        </header>
      </li>
    })}
  </ul>
};
