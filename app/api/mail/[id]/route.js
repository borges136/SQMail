import { mailService } from "../../services/mail.service";
import { NextResponse } from "next/server";
import { utilService } from "../../services/util.service";

function getCurrDate(){
    const currDate = new Date();
    return currDate.toISOString().slice(0, 19).replace('T', ' ')
}

export const GET = async (req, {params}) =>{
    console.log('get mail by id');
    // console.log('context:', context)
    const {id} = params
    // const id = req.url.slice(req.url.lastIndexOf('/')+1)
   
    const mail = await mailService.getById(id)
    return NextResponse.json(mail)
}
export const PUT = async (req) =>{
    console.log('update mail');
    // const id = req.url.slice(req.url.lastIndexOf('/')+1)
    let {subject,body,sentAt,from,to,isRead,isStarred,removedAt,isDraft,id} =  await req.json()
   if (isDraft) sentAt = utilService.getCurrDate()
    const values =  [subject, body, sentAt, from, to, isRead, isStarred, removedAt, isDraft,id]
   const res = await mailService.update(values)
   const mail = {
    id,
    subject,
    body ,
    sentAt ,
    from ,
    to ,
    isRead ,
    isStarred ,
    isTrash ,
    isDraft 
}
   return NextResponse.json(mail)
}
export const DELETE = async (req) =>{
    console.log('delete mail');
    const id = req.url.slice(req.url.lastIndexOf('/')+1)
    await mailService.remove(id)
    return NextResponse.json(`mail deleted`)
}