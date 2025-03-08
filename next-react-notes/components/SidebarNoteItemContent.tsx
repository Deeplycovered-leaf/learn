'use client'

import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
 id: string
 title: string
 children: React.ReactNode
 expandedChildren: React.ReactNode
}

export default function SidebarNoteItemContent(props: Props) {  
  const router = useRouter()
  const pathname = usePathname()
  const selectedId = pathname?.split('/')[1] || null

  const [isPending] = React.useTransition()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const isActive = props.id === selectedId

  // Animate after title is edited.
  const itemRef = React.useRef<HTMLDivElement>(null);
  const prevTitleRef = React.useRef(props.title);

  React.useEffect(() => {
    if (props.title !== prevTitleRef.current) {
      prevTitleRef.current = props.title;
      itemRef.current?.classList.add('flash');
    }
  }, [props.title]);
  
  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current?.classList.remove('flash');
      }}
      className={[
        'sidebar-note-list-item',
        isExpanded ? 'note-expanded' : '',
      ].join(' ')}>
      {props.children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending
            ? 'var(--gray-80)'
            : isActive
              ? 'var(--tertiary-blue)'
              : '',
          border: isActive
            ? '1px solid var(--primary-border)'
            : '1px solid transparent',
        }}
        onClick={() => {
          const sidebarToggle = document.getElementById('sidebar-toggle') as HTMLInputElement
          if (sidebarToggle) {
            sidebarToggle.checked = true
          }
          router.push(`/note/${props.id}`)
        }}>
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}>
        {isExpanded ? (
          <img
            src="/chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {isExpanded && props.expandedChildren}
    </div>
  );
};
