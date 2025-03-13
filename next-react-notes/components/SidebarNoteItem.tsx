import { Note } from "@/types";
import SidebarNoteItemContent from "./SidebarNoteItemContent";
import SidebarNoteItemHeader from "./SidebarNoteItemHeader";

type Props = {
  noteId: string
  note: Note
}
export default function SidebarNoteItem(props: Props) {
  const { title, content = '', updateTime } = props.note;

  return (
    <SidebarNoteItemContent
      id={props.noteId}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content?.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  )

};
