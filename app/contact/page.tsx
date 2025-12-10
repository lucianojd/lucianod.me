"use server"

import ContactPage from './contact-page';
import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS, CLOUD_FLARE_TURNSTILE } from '@app/_constants';

export async function submitContactForm(currentState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;
  const response = formData.get('cf-turnstile-response') as string;

  console.log({
    name,
    email,
    response
  })

  const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS
      }
  });

  await transporter.sendMail({
      from: email,
      to: EMAIL_USER,
      subject,
      text: message,
  });

  return {success: false};
}

export default async function Page() {
  return <ContactPage />;
}
