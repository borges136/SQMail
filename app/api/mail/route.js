import { mailService } from "../services/mail.service.js";
import { NextResponse } from "next/server";

export const GET = async (req) =>{
    
    const queryParams = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const criteria = {
        txt: queryParams.txt,
        sortBy:queryParams.sortBy,
        sortDir:queryParams.sortDir,
        folder:queryParams.folder
    }
    const mails = await mailService.query(criteria)
    return NextResponse.json(mails)
}
export const POST = async (req) =>{
    let {subject,body,sentAt,from,to,isRead,isStarred,removedAt,isDraft} =  await req.json()
    
    if (!isDraft) {
        const currentDate = new Date();
        sentAt = currentDate.toISOString().split('T')[0];
    }
    // isDraft =  isDraft? 1 : 0
    // isRead =  isRead? 1 : 0
    // isStarred =  isStarred? 1 : 0
    const values = [subject, body , sentAt,from,to,isRead,isStarred,removedAt,isDraft]
    // console.log('mail:', mail)
    var res = await mailService.add(values)
    console.log('res:', res)
    // console.log('trying post');
    const mail = {
        id: res.insertId,
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