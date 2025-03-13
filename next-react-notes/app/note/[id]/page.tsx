import Note from '@/components/Note'
import {getNote} from '@/lib/redis';

type Props = {
  params: Record<string, string>
}
export default async function Page(props: Props) {
  // 动态路由 获取笔记 id
  const params = await props.params 
  const noteId = params.id;
  const note = await getNote(noteId)

  // 为了让 Suspense 的效果更明显
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
  await sleep(1000);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <Note noteId={noteId} note={note} />
}

