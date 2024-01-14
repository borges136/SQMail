import { mailService } from '../../services/mail.service'
import { NextResponse } from 'next/server'
import { utilService } from '../../services/util.service'

export const GET = async (req, { params }) => {
  const { id } = params

  const mail = await mailService.getById(id)
  return NextResponse.json(mail)
}

export const PUT = async (req) => {
  let {
    subject,
    body,
    sentAt,
    from,
    to,
    isRead,
    isStarred,
    isTrash,
    isDraft,
    id,
  } = await req.json()

  sentAt = isDraft ? utilService.getCurrDate() : utilService.formatDate(sentAt)
  
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
    id,
  ]

  const res = await mailService.update(values)
  const mail = {
    id,
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

export const DELETE = async (req) => {
  const id = req.url.slice(req.url.lastIndexOf('/') + 1)
  await mailService.remove(id)
  return NextResponse.json(`mail deleted`)
}
