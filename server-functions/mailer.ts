"use server"
import nodemailer from "nodemailer";
import { getSessionUser } from "./user";

export async function sendMail(data: {email: string, subject: string, message: string}){
try{
const { createTransport } = nodemailer;

const user = await getSessionUser()
if(!user ||!user?.email)
    return ({message: "User not logged in."})
if(user.role !== "admin")
    return ({message: "Only admin can send emails."})

if(!data || !data?.email || !data?.subject || !data?.message)
return ({message: "All fields are required."})



    const transporter = createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.MAIL_PASSWORD
        }
    });


await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.error(error);
            reject(error);
        } else {
            resolve(success);
        }
    });
});

const mailOptions = {
    from:  `"Educational E-Content Marketplace" edu.econtent@eecm.vercel.app>`, // sender address
    to: data.email, 
    subject: data.subject, // Subject line
    html: data.message
   };

  const res = await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
            reject(err);
        } else {
    
            resolve(info);
        }
    });
});

return {success: true, res}

} catch(err){
    console.error(err)
    return { message: (err as {message: string}).message }
}
};