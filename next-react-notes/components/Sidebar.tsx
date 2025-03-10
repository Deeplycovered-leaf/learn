import Link from "next/link";
import { getAllNotes } from '@/lib/redis';
import SidebarNoteList from '@/components/SidebarNoteList';

export default async function Sidebar() {
  const notes =  await getAllNotes() 

  return (
    <>
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <img src="/logo.svg" alt="logo" width="22px" height="20px" role="presentation" />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          {/* SideSearchField */}
        </section>
        <nav>
          <SidebarNoteList notes={notes} />
        </nav>

      </section>
    </>
  )
};
