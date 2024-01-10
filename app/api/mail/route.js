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
  console.log('🚀 ~ GET ~ criteria:', criteria)

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

  
    
    // sentAt = utilService.getCurrDate()
    sentAt = utilService.getRandomDateLastTwoMonths()
    
  
  
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
  // console.log('mail:', mail)
  var res = await mailService.add(values)
  console.log('res:', res)
  // console.log('trying post');
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
