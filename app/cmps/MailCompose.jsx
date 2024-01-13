import { FiMinimize2, FiMaximize2 } from 'react-icons/fi'
import { TbTrash } from 'react-icons/tb'
import { MdMaximize, MdMinimize } from 'react-icons/md'

import { mailService } from '../services/mail.service'
import { utilService } from '../services/util.service'

import { useEffect, useRef, useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export default function MailCompose({
  renderSearchParams,
  searchParams,
  onAddMail,
  onUpdateMail,
  onRemoveMail
}) {
  const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const timeoutRef = useRef()

  useEffect(() => {
    const mailId = searchParams.get('compose')
    if (mailId && mailId !== 'new') {
      console.log('yes');
      loadMail(mailId)
    }
  }, [])

  useEffectUpdate(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    timeoutRef.current = setTimeout(() => onSaveDraft(mailToEdit), 3000)
  }, [mailToEdit])

  async function loadMail(mailId) {
    try {
      const mail = await mailService.get(mailId)
      setMailToEdit(mail)
    } catch (err) {
      console.log(err)
    }
  }

  async function removeMail(){
    if (!mailToEdit.id) return
    await onRemoveMail(mailToEdit.id)
    renderSearchParams('')
  }

  async function onSaveDraft(mail) {
    if (!mail.id) {
      const addedMail = await onAddMail(mail)
      setMailToEdit(addedMail)
      renderSearchParams(addedMail.id)
    } else {
      onUpdateMail(mail)
    }
  }

  async function onSendMail(ev) {
    ev.preventDefault()
    if (!utilService.validateMail(mailToEdit.to)) {
      return showErrorMsg('Invalid Email Address!')
    }
    await onSaveDraft({ ...mailToEdit, isDraft: 0 })
    renderSearchParams('')
  }

  async function handleChange({ target: { value, name } }) {
    try {
      setMailToEdit((prev) => ({ ...prev, [name]: value }))
    } catch (err) {
      console.log(err)
    }
  }

  function toggleFullScreen() {
    setIsFullScreen(!isFullScreen)
    setIsMinimized(false)
  }

  function toggleIsMinimized() {
    setIsMinimized(!isMinimized)
  }

  const viewClass = isMinimized
    ? 'minimized'
    : isFullScreen
    ? 'full-screen'
    : 'standard'

  const { subject = '', body = '', to = '' } = mailToEdit

  return (
    <>
      {viewClass === 'full-screen' && (
        <div
          className="screen bg-black opacity-50 inset-0 fixed"
          onClick={() => renderSearchParams('')}
        ></div>
      )}
      <section
        className={`mail-compose ${viewClass} md:rounded-t-lg bg-white dark:text-clrTxtPrimary`}
      >
        <header className="compose-header md:rounded-t-lg bg-clrRead">
          <h4>{mailToEdit.subject || 'New Message'}</h4>
          <div className="icons-container">
            <span onClick={toggleIsMinimized}>
              {isMinimized ? (
                <MdMaximize size={16} />
              ) : (
                <MdMinimize size={16} />
              )}
            </span>
            <span onClick={toggleFullScreen}>
              {isFullScreen ? (
                <FiMinimize2 size={16} />
              ) : (
                <FiMaximize2 size={16} />
              )}
            </span>
            <span onClick={() => renderSearchParams('')}>X</span>
          </div>
        </header>
        <form className="compose-form">
          <input
            value={to}
            onChange={handleChange}
            name="to"
            id="to"
            type="text"
            placeholder="To"
          />
          <input
            value={subject}
            onChange={handleChange}
            name="subject"
            id="subject"
            type="text"
            placeholder="Subject"
          />
          <textarea
            value={body}
            onChange={handleChange}
            name="body"
            id="body"
            type="text"
          />
        </form>
        <div className="compose-controls">
          <button className="text-white" onClick={onSendMail}>
            Send
          </button>
          <span onClick={removeMail} className="hover:bg-clrHover rounded-full cursor-pointer">
            <TbTrash size={20} />
          </span>
        </div>
      </section>
    </>
  )
}
