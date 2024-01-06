import { utilService } from '@/app/services/util.service'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import logo from '@/public/logo.png'
import Image from 'next/image'

export default function MainHeader({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const debouncedSetFilter = useRef(utilService.debounce(onSetFilter, 500))

  useEffect(() => {
    debouncedSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const { name: field, value } = target
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }
  return (
    <header className="main-header flex">
      <button>expand-menu</button>
      <div className="logo flex items-center">
        <Image
          src="/logo.png"
          width={40}
          height={40}
          // placeholder='blur'
          alt="Logo"
        />{' '}
        <span>SQmail</span>
      </div>
      <form className="header-search flex items-center">
        <label title="search" htmlFor="txt" className="">
          <AiOutlineSearch className="text-clrTxtTertiary" size={22} />
        </label>
        <input
          value={filterByToEdit.txt}
          onChange={handleChange}
          type="text"
          name="txt"
          id="txt"
          placeholder={`Search`}
        />
      </form>
    </header>
  )
}
