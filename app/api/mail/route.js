import { mailService } from '../services/mail.service.js'
import { NextResponse } from 'next/server'
import { utilService } from '../services/util.service.js'



export const GET = async (req) => {
  const queryParams = new URL(req.url, `http://${req.headers.host}`)
    .searchParams
  console.log('🚀 ~ GET ~ queryParams:', queryParams)
  const criteria = {
    txt: queryParams.get('txt'),
    // sortBy: queryParams.get('sortBy'),
    // sortDir: +queryParams.get('sortDir'),
    folder: queryParams.get('folder'),
  }

  const mails = await mailService.query(criteria)
  return NextResponse.json(mails)
}
export const POST = async (req) => {
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
  } = await req.json()

  
    from = mailService.getLoggedinUser().email
    sentAt = utilService.getCurrDate()
    // sentAt = utilService.getRandomDateWithinMonths(2)
    
  
  
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
  console.log('res:', res)
 
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
