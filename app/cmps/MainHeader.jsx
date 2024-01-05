import { utilService } from '@/app/services/util.service'
import { useEffect, useRef, useState } from 'react'

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
      <div className="logo">SQMail</div>
      <form className="header-search">
        <label title="search" htmlFor="txt" className="">
          search
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
