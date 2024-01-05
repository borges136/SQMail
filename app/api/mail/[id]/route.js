import { mailService } from "../mail.service";
import { NextResponse } from "next/server";

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
   const values =  [subject, body, sentAt, from, to, isRead, isStarred, removedAt, isDraft,id]
   const res = await mailService.update(values)
   console.log('res:', res)
   const mail = {
    id,
    subject,
    body ,
    sentAt ,
    from ,
    to ,
    isRead ,
    isStarred ,
    removedAt ,
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