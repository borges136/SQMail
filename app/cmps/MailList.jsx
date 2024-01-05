import MailPreview from "./MailPreview";

export default function MailList({mails}) {
    return (
      <ul className="mail-list">
      {mails.map(mail => (
        <MailPreview
          key={mail.id}
         
          
          mail={mail}
          
        />
      ))}
      </ul>
    )
  }