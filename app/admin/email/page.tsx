"use client"
// ./app/[user]/admin/components/Email.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendMail } from '@/server-functions/mailer';
import { toast } from 'react-toastify';

// eslint-disable-next-line 
const Email = () => {


  // eslint-disable-next-line
  const [content, setContent] = useState('<p>Write Email</p><br><br><br><p><sub style="font-family: Georgia, Palatino, serif; color: rgb(0, 0, 255);">By Educational E-content Marketplace</sub></p>');
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false)
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    // Send Email Here
    try { 
    if (!email ||!subject) {
      toast.error("Email and subject are required")
      return
    }

    if(!/.*\@.*\..{2,7}/.test(email))
      return toast.error("Email invalid")
  
    if(subject.length > 150)
      return toast.error("Subject should not exceed 150 characters")

    setSending(true)
    const res = await sendMail({ email, subject, message: JSON.parse(JSON.stringify(content)) })
    if (res.message) {
      toast.error(res.message)
    } else {
      toast.success("Email sent successfully")
      setEmail("")
    }
    setSending(false)
  } catch (error) {
      toast.error((error as {message: string}).message)
  }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className='text-3xl font-bold'>Send Email</h3>

      <div className="w-full">
        <h2 className="text-lg font-semibold mb-2">Editor</h2>
        <Card >
          <div className='text-black dark:bg-gray-900'

         

          />
        </Card>
      </div>
      <div className="w-full">
        <h2 className="text-lg font-semibold mb-2">Preview / Content</h2>
        <div className="border p-4 rounded-md h-full overflow-auto">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
      <p>Write Email</p>
      <Input placeholder='sid@example.com' value={email} onChange={e => setEmail(e.target.value)} />
      <p>Write Subject</p>
      <Input placeholder='Reported Content' onChange={e => setSubject(e.target.value)} />
      <Button className='max-w-lg mx-auto' onClick={handleSubmit} disabled={sending}>
        {sending ? "Sending email please wait.." : "Send Email"}</Button>
    </div>
  );
};

export default Email;
