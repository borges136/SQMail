import { Fragment } from 'react'
import MailPreview from './MailPreview'

export default function MailList({
  mails,
  folder,
  onUpdateMail,
  onRemoveMail,
}) {
  return (
    <Fragment>
      {mails.length ? (
        <ul className="mail-list">
          {mails.map((mail) => (
            <MailPreview
              key={mail.id}
              mail={mail}
              folder={folder}
              onUpdateMail={onUpdateMail}
              onRemoveMail={onRemoveMail}
            />
          ))}
        </ul>
      ) : (
        <h1 className="no-mails-info">No mails here</h1>
      )}
    </Fragment>
  )
}
