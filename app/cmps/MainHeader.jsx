import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.svg'

import { AiOutlineSearch } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'
import { MdDarkMode } from 'react-icons/md'

import { utilService } from '@/app/services/util.service'
import { useEffect, useRef, useState } from 'react'

export default function MainHeader({
  filterBy,
  onSetFilter,
  sidebarExpand,
  setSidebarExpand,
}) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const debouncedSetFilter = useRef(utilService.debounce(onSetFilter, 500))

  useEffect(() => {
    debouncedSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark')
  }

  function handleChange({ target }) {
    const { name: field, value } = target
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <header className="main-header flex">
      <span
        onClick={() => {
          setSidebarExpand(!sidebarExpand)
        }}
        className="expand-hamburger flex-center cursor-pointer rounded-full hover:bg-clrHover"
      >
        <RxHamburgerMenu size={24} />
      </span>
      <Link href={'/'} className="logo flex items-center">
        <Image src={logo} alt="Logo" />
        <span>SQmail</span>
      </Link>
      <form className="header-search flex items-center rounded-3xl	bg-clrInput dark:bg-clrInputDark focus-within:bg-white">
        <label title="search" htmlFor="txt" className="p-3">
          <AiOutlineSearch size={22} />
        </label>
        <input
          className="bg-clrInput dark:bg-clrInputDark focus:bg-white outline-none"
          value={filterByToEdit.txt}
          onChange={handleChange}
          type="text"
          name="txt"
          id="txt"
          placeholder={`Search mail`}
        />
      </form>
      <span onClick={toggleDarkMode} className="dark-btn cursor-pointer">
        <MdDarkMode size={28} />
      </span>
    </header>
  )
}
