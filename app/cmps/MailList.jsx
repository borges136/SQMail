import { Fragment } from 'react'
import MailPreview from './MailPreview'

export default function MailList({
  mails,
  folder,
  onUpdateMail,
  onRemoveMail,
  renderSearchParams
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
              renderSearchParams={renderSearchParams}
            />
          ))}
        </ul>
      ) : (
        <h1 className="no-mails-info">No mails here</h1>
      )}
    </Fragment>
  )
}
