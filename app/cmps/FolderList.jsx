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
    <ul className='folder-list'>
      <li
        className={`  hover:bg-clrHover ${
          pathname === '/mail/inbox' ? 'bg-clrSidebarActive' : ''
        }`}
      >
        <Link className="flex items-center h-8" href="/mail/inbox">
          <HiOutlineInbox />
          <span className='txt-span'>Inbox</span>
        </Link>
      </li>
      <li
        className={`flex items-center hover:bg-clrHover ${
          pathname === '/mail/starred' ? 'bg-clrSidebarActive' : ''
        }`}
      >
        <Link className="flex items-center  h-8" href="/mail/starred">
          <MdOutlineStar size={20} />
          <span className='txt-span'>Starred</span>
        </Link>
      </li>
      <li
        className={`flex items-center hover:bg-clrHover ${
          pathname === '/mail/sent' ? 'bg-clrSidebarActive' : ''
        }`}
      >
        <Link className="flex items-center h-8" href="/mail/sent">
          <RxPaperPlane />
          <span className='txt-span'>Sent</span>
        </Link>
      </li>
      <li
        className={`flex items-center hover:bg-clrHover ${
          pathname === '/mail/draft' ? 'bg-clrSidebarActive' : ''
        }`}
      >
        <Link className="flex items-center h-8" href="/mail/draft">
          <CiFileOn />
          <span className='txt-span'>Draft</span>
        </Link>
      </li>
      <li
        className={`flex items-center hover:bg-clrHover ${
          pathname === '/mail/trash' ? 'bg-clrSidebarActive' : ''
        }`}
      >
        <Link className="flex items-center h-8" href="/mail/trash">
          <FaRegTrashAlt />
          <span className='txt-span'>Trash</span>
        </Link>
      </li>
    </ul>
  )
}
