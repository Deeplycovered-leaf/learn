import Link from "next/link";
import SidebarNoteList from '@/components/SidebarNoteList';
import EditButton from "./EditButton";
import { Suspense } from "react";
import NoteListSkeleton from "./NoteListSkeleton";
import SidebarSearchField from '@/components/SidebarSearchField';

export default async function Sidebar() {


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
          <SidebarSearchField />
          <EditButton>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
};
