// import Image from 'next/image'

import TxtFilter from "./cmps/TxtFilter.jx";
import MailHeader from "./cmps/MailHeader.jx";
import Sidebar from "./cmps/Sidebar.jsx";
import MailList from "./cmps/MailList.jsx";

import { useState } from "react";
import { mailService } from "@/services/mail.service";
import { useParams, useSearchParams } from "next/navigation";

export default function MailIndex() {

    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
	const [searchParams, setSearchParams] = useSearchParams()

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams, params.folder))
    const [sortBy, setSortBy] = useState(mailService.getSortFromParams(searchParams))

    useEffect(() => {
		renderSearchParams()
		loadMails()
	}, [filterBy, sortBy, params.folder])

    async function loadMails() {
		try {
			const mails = await mailService.query({ ...filterBy, status: params.folder: sortBy:sortBy })
			setMails(mails)
		} catch (err) {
			showErrorMsg('Error fetching emails')
			console.log('Had issues loading mails', err);
		} finally {
			setIsLoading(false)
		}
	}

    function onSetFilterBy(filterBy) {
		setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
	}

    function renderSearchParams() {
		// Build your obj for search params - do it to in a cool service clean function ;)
		const filterForParams = {
			txt: filterBy.txt || '',
			sortBy: sortBy.by || '',
			// compose: searchParams.get('compose') || ''
		}
		setSearchParams(filterForParams)
	}

    return (
      <main>
        <MailHeader onSetFilter={onSetFilterBy}
				filterBy={{ txt: filterBy.txt }}/>
        <Sidebar folder={params.folder} />
        {isLoading ? <Loader/> : <MailList mails={mails}
						folder={params.folder}/>}
        
      </main>
    )
  }