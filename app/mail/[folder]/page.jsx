'use client'
// import Image from 'next/image'
// import TxtFilter from "./cmps/TxtFilter.jx";
import MainHeader from '@/app/cmps/MainHeader.jsx'
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
import Loader from '@/app/cmps/Loader'
import { showErrorMsg, showSuccessMsg } from '@/app/services/event-bus.service'
import MultSelectBar from '@/app/cmps/MultSelectBar'

export default function MailIndex() {
  //   const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [mails, setMails] = useState(null)
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromParams(searchParams)
  )
  const [sortBy, setSortBy] = useState(
    mailService.getSortFromParams(searchParams)
  )
  const [sidebarExpand, setSidebarExpand] = useState(false)

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
        sortDir: sortBy.dir,
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

  async function onUpdateMail(mail) {
    try {
      const updatedMail = await mailService.save(mail)
      if (
        (params.folder === 'draft' && !updatedMail.isDraft) ||
        (params.folder === 'starred' && !updatedMail.isStarred) ||
        (params.folder === 'trash' && !updatedMail.removedAt) ||
        (params.folder !== 'trash' && updatedMail.removedAt)
      ) {
        setMails((prevMails) =>
          prevMails.filter((m) => m.id !== updatedMail.id)
        )
      } else if (params.folder === 'sent' && updatedMail.isDraft) {
        setMails((prevMails) => [savedMail, ...prevMails])
      } else {
        setMails((prevMails) =>
          prevMails.map((mail) =>
            mail.id === updatedMail.id ? updatedMail : mail
          )
        )
      }
    } catch (err) {
      showErrorMsg('Action failed')
      console.log('Had issues updating mail', err)
    }
  }

  async function onRemoveMail(mailId) {
    try {
      // if (!confirm('are you sure you want to delete mail forever?')) return
      await mailService.remove(mailId)
      // these mails are only shown when we're at the "removed" page, so we can act like we're "deleting" them from that page.
      setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId))
      showSuccessMsg(`Email removed!`)
    } catch (err) {
      showErrorMsg('Deleting mail failed')
      console.log('Had issues removing mail', err)
    }
  }

  async function onAddMail(mail) {
    try {
      const savedMail = await mailService.save({ ...mail })
      if (
        params.folder === 'sent' ||
        (params.folder === 'draft' && savedMail.isDraft)
      ) {
        setMails((prevMails) => [savedMail, ...prevMails])
      }
      const msg = savedMail.isDraft
        ? 'Mail saved to draft'
        : 'Mail Sent to ' + savedMail.to
      showSuccessMsg(msg)
      return savedMail
    } catch (err) {
      showErrorMsg('Sending mail failed')
      console.log('Had issues sending mail', err)
    }
  }

  return (
    <main className="mail-index-layout">
      <MainHeader
        sidebarExpand={sidebarExpand}
        setSidebarExpand={setSidebarExpand}
        onSetFilter={onSetFilterBy}
        filterBy={{ txt: filterBy.txt }}
      />
      <Sidebar folder={params.folder} sidebarExpand={sidebarExpand} />
      <section className="mails-container">
        <MultSelectBar />

        {mails ? (
          <MailList
            mails={mails}
            onRemoveMail={onRemoveMail}
            onUpdateMail={onUpdateMail}
            folder={params.folder}
          />
        ) : (
          <Loader />
        )}
      </section>
    </main>
  )
}
