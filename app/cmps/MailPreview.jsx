import { useEffect, useState } from 'react'
import { format, isToday, isThisMonth } from 'date-fns'
import { MdOutlineStarBorder, MdOutlineStar } from 'react-icons/md'
import { IoMailUnreadOutline } from 'react-icons/io5'
import { LuMailOpen } from 'react-icons/lu'
import { TbTrash, TbTrashOff } from 'react-icons/tb'
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
  useEffect(() => {
    if (isExpanded && !isRead) {
      onToggleIsRead()
    }
  }, [isExpanded])

  function onToggleIsExapnded(ev) {
    ev.stopPropagation()
    setIsExpanded((prev) => !prev)
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
    ev.stopPropagation()
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
  const readTitle = isRead? 'Mark as unread' : 'Mark as read'
  const readClass = isRead ? 'bg-clrRead dark:bg-clrReadDark' : 'dark:bg-clrUneadDark unread'
  return (
    <li className={`mail-preview ${readClass}`}>
      <span onClick={onToggleIsStarred} title={starTitle} className='star-span'>
        {mail.isStarred ? (
          <MdOutlineStar size={20} className="text-clrStarred" />
        ) : (
          <MdOutlineStarBorder
            size={20}
            className="text-clrTxtSecondary hover:text-clrTxtTertiary"
          />
        )}
      </span>
      <div className="preview-main-content">
        <span className="mail-address">
          {folder === 'draft' && 'Draft'}
          {folder === 'sent' && `To: ${mail.to}`}
          {folder !== 'draft' && folder !== 'sent' && mail.from}
        </span>
        <span className="mail-subject">{mail.subject || '(no subject)'}</span>
        <span className="mail-seperator">-</span>
        <span className="mail-body">{mail.body}</span>
      </div>

      
      <span className="date">{formatDate(mail.sentAt)}</span>
      <div className="icons">
        <span onClick={onToggleIsRead} title={readTitle}>
          {isRead ? <IoMailUnreadOutline /> : <LuMailOpen />}
        </span>
        <span onClick={onToggleIsTrash}>
          {folder === 'trash' ? <TbTrashOff /> : <TbTrash />}
        </span>
      </div>
    </li>
  )
}
