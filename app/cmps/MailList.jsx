import MailPreview from './MailPreview'

export default function MailList({ mails,folder }) {
  return (
    <>
      {mails.length ? (
        <ul className="mail-list">
          {mails.map((mail) => (
            <MailPreview key={mail.id} mail={mail} folder={folder} />
          ))}
        </ul>
      ) : (
        <h1 className="no-mails-info">No mails here</h1>
      )}
    </>
  )
}
