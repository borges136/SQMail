import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdOutlineStarBorder, MdOutlineStar } from 'react-icons/md'
import { RxPaperPlane } from 'react-icons/rx'
import { CiFileOn } from 'react-icons/ci'
import { FaRegTrashAlt } from 'react-icons/fa'
import { HiOutlineInbox } from 'react-icons/hi'

export default function FolderList() {
  const pathname = usePathname()
  return (
    <ul className="folder-list">
      <li
     
      >
        <Link className={
          pathname === '/mail/inbox'
            ? 'bg-clrSidebarActive'
            : 'hover:bg-clrHover'
        } href="/mail/inbox">
          <HiOutlineInbox size={20} />
          <span className="txt-span">Inbox</span>
        </Link>
      </li>
      <li
        
      >
        <Link className={
          pathname === '/mail/starred'
            ? 'bg-clrSidebarActive'
            : 'hover:bg-clrHover'
        } href="/mail/starred">
          <MdOutlineStar size={20} />
          <span className="txt-span">Starred</span>
        </Link>
      </li>
      <li
        
      >
        <Link className={
          pathname === '/mail/sent'
            ? 'bg-clrSidebarActive'
            : 'hover:bg-clrHover'
        } href="/mail/sent">
          <RxPaperPlane size={20} />
          <span className="txt-span">Sent</span>
        </Link>
      </li>
      <li
      
      >
        <Link className={
          pathname === '/mail/draft'
            ? 'bg-clrSidebarActive'
            : 'hover:bg-clrHover'
        } href="/mail/draft">
          <CiFileOn size={20} />
          <span className="txt-span">Draft</span>
        </Link>
      </li>
      <li
      
      >
        <Link className={
          pathname === '/mail/trash'
            ? 'bg-clrSidebarActive'
            : 'hover:bg-clrHover'
        } href="/mail/trash">
          <FaRegTrashAlt size={20} />
          <span className="txt-span">Trash</span>
        </Link>
      </li>
    </ul>
  )
}
