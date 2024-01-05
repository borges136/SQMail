'use client'
// import Image from 'next/image'
// import TxtFilter from "./cmps/TxtFilter.jx";
import MailHeader from './cmps/MainHeader.jsx'
import Sidebar from './cmps/Sidebar.jsx'
import MailList from './cmps/MailList.jsx'

import { useEffect, useState } from 'react'
import { mailService } from '@/services/mail.service'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

export default function MailIndex() {
  const [isLoading, setIsLoading] = useState(false)
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
    console.log('searchParams', searchParams)
    console.log('params', params)
    console.log('pathname', pathname)
    renderSearchParams()
    loadMails()
  }, [filterBy, sortBy, params.folder])

  async function loadMails() {
    try {
      const mails = await mailService.query({
        txt:filterBy.txt,
        folder: params.folder,
        sortBy: sortBy.by,
        sortDir: sortBy.sortDir
      })
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
    // Build your obj for search params - do it to in a cool service clean function ;)
    const qsParams = new URLSearchParams(searchParams)
    qsParams.set('txt', filterBy.txt)
    qsParams.set('sortBy', sortBy.by)
    router.push(pathname + '?' + qsParams.toString())
    //   qsParams.toString()
    // const filterForParams = {
    // txt: filterBy.txt || '',
    // sortBy: sortBy.by || '',
    // compose: searchParams.get('compose') || ''
    // }
    // searchParams = {...searchParams,txt:'hi'}
    // console.log("🚀 ~ file: page.jsx:53 ~ renderSearchParams ~ searchParams:", searchParams)
    // setSearchParams(filterForParams)
  }

  return (
    <main className="mail-index">
      <MailHeader
        onSetFilter={onSetFilterBy}
        filterBy={{ txt: filterBy.txt }}
      />
      <Sidebar folder={params.folder} />
      {isLoading ? (
        <span className="loader"></span>
      ) : (
        <MailList mails={mails} folder={params.folder} />
      )}
    </main>
  )
}
