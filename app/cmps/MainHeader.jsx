import { utilService } from '@/app/services/util.service'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import logo from '@/public/logo.svg'
import Image from 'next/image'

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
      <div className="logo flex items-center">
        {/* <img src="/my-logo.svg" alt="Logo" width={40} height={40} /> */}
        <Image
          src={logo}
          // width={28}
          // height={28}
          // placeholder='blur'
          // layout="responsive"
          alt="Logo"
        />
        <span>SQmail</span>
      </div>
      <form className="header-search flex items-center rounded-3xl	bg-clrInput dark:bg-clrInputDark focus-within:bg-white">
        {/* text-clrTxtTertiary dark:text-clrTxtTertiaryDark */}
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
