'use client'
// import Image from 'next/image'
// import TxtFilter from "./cmps/TxtFilter.jx";
import MailHeader from '@/app/cmps/MainHeader.jsx'
import Sidebar from '@/app/cmps/Sidebar.jsx'
// import MailList from '../../cmps/MailList.jsx'
import MailList from '@/app/cmps/MailList.jsx'

import { useEffect, useState } from 'react'
import { mailService } from '@/app/services/mail.service.js'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import MailSort from '@/app/cmps/MailSort.jsx'
import Loader from '@/app/cmps/Loader'

export default function MailIndex() {
  //   const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [mails, setMails] = useState([])
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromParams(searchParams, params.folder)
  )
  const [sortBy, setSortBy] = useState(
    mailService.getSortFromParams(searchParams)
  )

  useEffect(() => {
    renderSearchParams()
    loadMails()
  }, [filterBy, sortBy, params.folder])

  async function loadMails() {
    try {
      const mails = await mailService.query({
        txt: filterBy.txt,
        folder: params.folder,
        sortBy: sortBy.by,
        sortDir: sortBy.sortDir,
      })
      //   console.log('mails: ',mails);
      setMails(mails)
    } catch (err) {
      // showErrorMsg('Error fetching emails')
      console.log('Had issues loading mails', err)
    } finally {
      // setIsLoading(false)
    }
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  function renderSearchParams() {
    const qsParams = new URLSearchParams(searchParams)
    qsParams.set('txt', filterBy.txt)
    qsParams.set('sortBy', sortBy.by)
    router.push(pathname + '?' + qsParams.toString())
  }

  return (
    <main className="mail-index-layout">
      <MailHeader
        onSetFilter={onSetFilterBy}
        filterBy={{ txt: filterBy.txt }}
      />
      <Sidebar folder={params.folder} />
      <section className="mails-container">
        <MailSort />
        {mails ?
        <MailList mails={mails} folder={params.folder} />
      : <Loader/>}
      </section>
    </main>
  )
}
