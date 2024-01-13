import {  MdOutlineStar } from 'react-icons/md'
import { FaRegTrashAlt } from 'react-icons/fa'
import { CiFileOn } from 'react-icons/ci'
import { HiOutlineInbox } from 'react-icons/hi'
import { RxPaperPlane } from 'react-icons/rx'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function FolderList({searchParams}) {
  
  function getFolderPath(folder){
    const composeParams = searchParams.get('compose') ? `&compose=${searchParams.get('compose')}` : ''
    return `/mail/${folder}?txt=${searchParams.get('txt')}${composeParams}`
  }

  function getLinkClass(folder){
    return pathname === `/mail/${folder}`
            ? 'bg-clrSidebarActive dark:bg-clrSidebarActiveDark'
            : 'hover:bg-clrHover dark:hover:bg-clrHoverDark'
  }

  const pathname = usePathname()
  return (
    <ul className="folder-list">
      <li
      >
        <Link className={getLinkClass('inbox')} href={getFolderPath('inbox')}>
          <HiOutlineInbox size={20} />
          <span className="txt-span">Inbox</span>
        </Link>
      </li>
      <li 
      >
        <Link className={getLinkClass('starred')} href={getFolderPath('starred')}>
          <MdOutlineStar size={20} />
          <span className="txt-span">Starred</span>
        </Link>
      </li>
      <li
      >
        <Link className={getLinkClass('sent')} href={getFolderPath('sent')}>
          <RxPaperPlane size={20} />
          <span className="txt-span">Sent</span>
        </Link>
      </li>
      <li
      >
        <Link className={getLinkClass('draft')} href={getFolderPath('draft')}>
          <CiFileOn size={20} />
          <span className="txt-span">Draft</span>
        </Link>
      </li>
      <li
      >
        <Link className={getLinkClass('trash')} href={getFolderPath('trash')}>
          <FaRegTrashAlt size={20} />
          <span className="txt-span">Trash</span>
        </Link>
      </li>
    </ul>
  )
}
