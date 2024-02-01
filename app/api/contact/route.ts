import { NextResponse } from "next/server";

type bodyType= {
    name: string;
    email: string;
    object: string;
    content: string;
}

export async function POST(
    request: Request
) {

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: 'webmailtest0000@gmail.com',
          pass: process.env.NEXT_PUBLIC_PASSWORD,
        },
        secure: true,
        tls: {
            rejectUnauthorized: false
          }
    });

    const body: bodyType = await request.json();
    console.log("🚀 ~ body:", body)
 
    const mailData = {
        from: 'webmailtest0000@gmail.com',
        to: 'baptiste.lejeune@hotmail.com',
        subject: `Message from ${body.name}`,
        text: body.content,
        html: `<div>${body.content}</div>`
    }

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailData, (err: any, info: any) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
    
    return NextResponse.json({ message: 'Sent'}, {status: 200})
}