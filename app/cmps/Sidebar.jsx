import FolderList from '@/app/cmps/FolderList.jsx'
import { HiOutlinePencil } from 'react-icons/hi'

export default function Sidebar({ sidebarExpand,renderSearchParams }) {
  return (
    <aside className={`sidebar ${sidebarExpand ? 'expand' : ''}`}>
      <button className="compose-btn flex items-center" onClick={()=>renderSearchParams('new')}>
        <HiOutlinePencil size={20}/>
        <span className='txt-span'>Compose</span>
      </button>
      <FolderList />
    </aside>
  )
}
