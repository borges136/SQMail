'use client'

import MainHeader from '@/app/cmps/MainHeader.jsx'
import Sidebar from '@/app/cmps/Sidebar.jsx'
import MailList from '@/app/cmps/MailList.jsx'
import MailCompose from '@/app/cmps/MailCompose'
import Loader from '@/app/cmps/Loader'
import MultSelectBar from '@/app/cmps/MultSelectBar'

import { mailService } from '@/app/services/mail.service.js'
import { useEffect, useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '@/app/services/event-bus.service'

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'

export default function MailIndex() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [mails, setMails] = useState(null)
  const [sidebarExpand, setSidebarExpand] = useState(true)
  const [filterBy, setFilterBy] = useState(
    mailService.getFilterFromParams(searchParams)
  )

  useEffect(() => {
    if (!window.matchMedia('(prefers-color-scheme: dark)').matches) return
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    renderSearchParams()
    loadMails()
  }, [filterBy, params.folder])

  async function loadMails() {
    try {
      const mails = await mailService.query({
        txt: filterBy.txt,
        folder: params.folder,
      })
      setMails(mails)
    } catch (err) {
      showErrorMsg('Error fetching emails')
      console.log('Had issues loading mails', err)
    }
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  function renderSearchParams(compose = searchParams.get('compose')) {
    const qsParams = new URLSearchParams()
    qsParams.set('txt', filterBy.txt)
    if (compose) qsParams.set('compose', compose)
    router.push(pathname + '?' + qsParams.toString())
  }

  async function onUpdateMail(mail) {
    console.log("🚀 ~ onUpdateMail ~ mail:", mail)
    try {
      
      const updatedMail = await mailService.save(mail)
      if (
        (params.folder === 'draft' && !updatedMail.isDraft) ||
        (params.folder === 'starred' && !updatedMail.isStarred) ||
        (params.folder === 'trash' && !updatedMail.isTrash) ||
        (params.folder !== 'trash' && updatedMail.isTrash)
      ) {
        setMails((prevMails) =>
          prevMails.filter((m) => m.id !== updatedMail.id)
        )
      } else if (
        params.folder === 'sent' &&
        !updatedMail.isDraft &&
        !mails.some((m) => m.id === updatedMail.id)
      ) {
        setMails((prevMails) => [updatedMail, ...prevMails])
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
      await mailService.remove(mailId)
      setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId))
      showSuccessMsg(`Email deleted!`)
    } catch (err) {
      showErrorMsg('Deleting mail failed')
      console.log('Had issues removing mail', err)
    }
  }

  async function onAddMail(mail) {
    try {
      const savedMail = await mailService.save({ ...mail })
      if (
        (params.folder === 'sent' && !savedMail.isDraft) ||
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
      <Sidebar
        folder={params.folder}
        sidebarExpand={sidebarExpand}
        searchParams={searchParams}
        renderSearchParams={renderSearchParams}
      />
      <section className="mails-container">
        <MultSelectBar />

        {mails ? (
          <MailList
            renderSearchParams={renderSearchParams}
            mails={mails}
            onRemoveMail={onRemoveMail}
            onUpdateMail={onUpdateMail}
            folder={params.folder}
          />
        ) : (
          <Loader />
        )}
      </section>
      {searchParams.get('compose') && (
        <MailCompose
          onAddMail={onAddMail}
          onUpdateMail={onUpdateMail}
          onRemoveMail={onRemoveMail}
          searchParams={searchParams}
          renderSearchParams={renderSearchParams}
        />
      )}
    </main>
  )
}
