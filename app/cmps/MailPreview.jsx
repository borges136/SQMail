export default function MailPreview({mail}) {
    return (
      <li className="flex">
        <p>{mail.id}</p>
        <p>{mail.subject}</p>
        
      </li>
    )
  }