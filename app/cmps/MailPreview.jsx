import { MdOutlineStarBorder, MdOutlineStar } from 'react-icons/md'
export default function MailPreview({ mail, folder }) {
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

  return (
    <li className="mail-preview">
      <div>
        {mail.isStarred ? (
          <MdOutlineStar size={20} className="text-clrStarred" />
        ) : (
          <MdOutlineStarBorder
            size={20}
            className="text-clrTxtSecondary hover:text-clrTxtTertiary"
          />
        )}
      </div>
      <div className="preview-main-content">
        <span className="mail-address">
          {folder !== 'draft' ? mail.from : '[Draft]'}
        </span>
        <span className="mail-subject">{mail.subject}</span>
        <span className="mail-seperator">-</span>
        <span className="mail-body">{mail.body}</span>
        {/* {mail.sentAt} */}
      </div>

      <span className="date">{formatDate(mail.sentAt)}</span>
      <div className="icons">icons</div>
    </li>
  )
}
