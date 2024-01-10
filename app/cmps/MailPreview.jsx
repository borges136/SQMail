import { useEffect, useState } from 'react'
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
  const { from, subject, body, sentAt, to, removedAt, isRead, isStarred } = mail

  function formatDate(inputDate) {
    // if (!inputDate) return
    // console.log(inputDate);
    // Parse the input date string
    const dateObject = new Date(inputDate)

    // Get the components of the date
    const year = dateObject.getFullYear()
    const month = dateObject.getMonth() + 1 // Months are zero-based, so add 1
    const day = dateObject.getDate()

    // Format the date with leading zeros if necessary
    const formattedDate = `${day}/${month}/${year % 100}`
    return formattedDate
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
    ev.stopPropagation() // prevent mail opening when starred
    const updatedMail = {
      ...mail,
      isStarred: !mail.isStarred,
    }
    onUpdateMail(updatedMail)
  }

  function onToggleIsRead(ev) {
    ev.stopPropagation()
    const updatedMail = {
      ...mail,
      isRead: !mail.isRead,
    }
    onUpdateMail(updatedMail)
  }

  function onToggleRemovedAt(ev) {
    ev.stopPropagation()

    const updatedMail = {
      ...mail,
      removedAt: mail.removedAt ? null : Date.now(),
    }
    onUpdateMail(updatedMail)
  }

  const starTitle = isStarred ? 'Starred' : 'Not starred'
  return (
    <li className="mail-preview">
      <span onClick={onToggleIsStarred} title={starTitle}>
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
          {folder !== 'draft' ? mail.from : '[Draft]'}
        </span>
        <span className="mail-subject">{mail.subject}</span>
        <span className="mail-seperator">-</span>
        <span className="mail-body">{mail.body}</span>
      </div>

      {/* <span className="date">{formatDate(mail.sentAt)}</span> */}
      <span className="date">{mail.sentAt}</span>
      <div className="icons">
        <span onClick={onToggleIsRead}>
          {isRead ? <IoMailUnreadOutline /> : <LuMailOpen />}
        </span>
        <span onClick={onToggleRemovedAt}>
          {folder === 'trash' ? <TbTrashOff /> : <TbTrash />}
        </span>
      </div>
    </li>
  )
}
