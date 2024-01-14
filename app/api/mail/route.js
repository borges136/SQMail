import { mailService } from '../services/mail.service.js'
import { NextResponse } from 'next/server'
import { utilService } from '../services/util.service.js'

export const GET = async (req) => {
  const queryParams = new URL(req.url, `http://${req.headers.host}`)
    .searchParams
  const criteria = {
    txt: queryParams.get('txt'),
    folder: queryParams.get('folder'),
  }

  const mails = await mailService.query(criteria)
  return NextResponse.json(mails)
}

export const POST = async (req) => {
  let { subject, body, sentAt, from, to, isRead, isStarred, isTrash, isDraft } =
    await req.json()

  from = mailService.getLoggedinUser().email
  sentAt = utilService.getCurrDate()

  // sentAt = utilService.getRandomDateWithinMonths(3) // for generating demo data

  const values = [
    subject,
    body,
    sentAt,
    from,
    to,
    isRead,
    isStarred,
    isTrash,
    isDraft,
  ]

  var res = await mailService.add(values)

  const mail = {
    id: res.insertId,
    subject,
    body,
    sentAt,
    from,
    to,
    isRead,
    isStarred,
    isTrash,
    isDraft,
  }
  return NextResponse.json(mail)
}
