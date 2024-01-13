import { useEffect, useRef, useState } from 'react'
import { mailService } from '../services/mail.service'
// import { FaRegWindowMinimize } from 'react-icons/fa'
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi'
import { utilService } from '../services/util.service'
import { MdMaximize, MdMinimize } from 'react-icons/md'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export default function MailCompose({
  renderSearchParams,
  searchParams,
  onAddMail,
  onUpdateMail,
}) {
  const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const timeoutRef = useRef()

  useEffect(() => {
    const mailId = searchParams.get('compose')
    if (mailId && mailId !== 'new') {
      console.log('loading mail')
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

  async function onSaveDraft(mail) {
    console.log('saving mail')
    if (!mail.id) {
      const addedMail = await onAddMail(mail)
      // setMailToEdit(addedMail)
      setMailToEdit(prevMail => {

        return {...prevMail, id:addedMail.id}})
      
      // searchParams.set('compose' ,addedMail.id)
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
    <section className={`mail-compose ${viewClass} bg-white dark:text-clrTxtPrimary`}>
      <header className="compose-header bg-clrRead">
        <h4>{mailToEdit.subject || 'New Message'}</h4>
        <div className="icons-container">
          <span onClick={toggleIsMinimized}>
            {isMinimized ? <FiMaximize2 size={16}/> : <MdMinimize size={16}/>}
          </span>
          <span onClick={toggleFullScreen}>
            {isFullScreen ? <FiMinimize2 size={16}/> : <FiMaximize2 size={16}/>}
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
        <button onClick={onSendMail}>send</button>
        <span>trash</span>
      </div>
    </section>
  )
}
