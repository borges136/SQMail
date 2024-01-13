import { useEffect, useState } from 'react'
import { format, isToday, isThisMonth } from 'date-fns'
import { MdOutlineStarBorder, MdOutlineStar } from 'react-icons/md'
import { IoMailUnreadOutline } from 'react-icons/io5'
import { LuMailOpen } from 'react-icons/lu'
import { TbTrash, TbTrashOff } from 'react-icons/tb'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import Star from './Star'
export default function MailPreview({
  mail,
  folder,
  onRemoveMail,
  onUpdateMail,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { from, subject, body, sentAt, to, isTrash, isRead, isStarred } = mail

  function formatDate(inputDate) {
    if (!inputDate) return ''

    const date = new Date(inputDate)

    if (isToday(date)) {
      return format(date, 'hh:mm a')
    }

    if (isThisMonth(date)) {
      return format(date, 'MMM d')
    }

    return format(date, 'MM/dd/yy')
  }
  useEffectUpdate(() => {
    if (isExpanded && !isRead) {
      onToggleIsRead()
    }
  }, [isExpanded])

  function onToggleIsExpanded(ev) {
    // ev.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  function onToggleIsStarred(ev) {
    console.log('sentAt', mail.sentAt)
    ev.stopPropagation()
    const updatedMail = {
      ...mail,
      isStarred: mail.isStarred ? 0 : 1,
    }
    onUpdateMail(updatedMail)
  }

  function onToggleIsRead(ev) {
    ev?.stopPropagation()
    const updatedMail = {
      ...mail,
      isRead: mail.isRead ? 0 : 1,
    }
    onUpdateMail(updatedMail)
  }

  function onToggleIsTrash(ev) {
    ev.stopPropagation()

    const updatedMail = {
      ...mail,
      isTrash: mail.isTrash ? 0 : 1,
    }
    onUpdateMail(updatedMail)
  }

  const starTitle = isStarred ? 'Starred' : 'Not starred'
  const readTitle = isRead ? 'Mark as unread' : 'Mark as read'
  const readClass = isRead
    ? 'bg-clrRead dark:bg-clrReadDark'
    : 'dark:bg-clrUnreadDark unread'
  return (
    <>
      <li onClick={onToggleIsExpanded} className={`mail-preview ${readClass}`}>
        <Star
          onToggleIsStarred={onToggleIsStarred}
          isStarred={isStarred}
          starTitle={starTitle}
        />
        <div className="preview-main-content">
          <span className="mail-address">
            {folder === 'draft' && 'Draft'}
            {folder === 'sent' && `To: ${to}`}
            {folder !== 'draft' && folder !== 'sent' && from}
          </span>
          <span className="mail-subject">{subject || '(no subject)'}</span>
          <span className="mail-seperator">-</span>
          <span className="mail-body">{body}</span>
        </div>

        <span className="date">{formatDate(sentAt)}</span>
        <div className="icons">
          <span onClick={onToggleIsRead} title={readTitle}>
            {isRead ? <IoMailUnreadOutline size={20}/> : <LuMailOpen size={20}/>}
          </span>
          <span onClick={onToggleIsTrash}>
            {folder === 'trash' ? <TbTrashOff size={20}/> : <TbTrash size={20}/>}
          </span>
        </div>
      </li>
      {isExpanded && (
        <li className="expanded-mail">
          <div className="details-controls">
            {!!isTrash && <span className='delete-forever' onClick={()=>onRemoveMail(mail.id)}>Delete forever</span>}
            <span onClick={onToggleIsTrash}>
              {folder === 'trash' ? <TbTrashOff size={20}/> : <TbTrash size={20}/>}
            </span>
            <span onClick={onToggleIsRead} title={readTitle}>
              {isRead ? <IoMailUnreadOutline size={20}/> : <LuMailOpen size={20}/>}
            </span>
            <Star
              onToggleIsStarred={onToggleIsStarred}
              isStarred={isStarred}
              starTitle={starTitle}
            />
          </div>
          <div className="mail-content">
            <h2 className="mail-subject">{subject}</h2>
            <h2 className="mail-from">{from}</h2>
            <h5 className="mail-to">to {to}</h5>

            <p className="mail-body">{body}</p>
          </div>
        </li>
      )}
    </>
  )
}
