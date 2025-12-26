'use server';

import ContactPage from './contact-page';
import nodemailer from 'nodemailer';
import { EMAIL, CLOUD_FLARE_TURNSTILE } from '@app/_constants';
import axios from 'axios';

type CloudFlareVerificationResponse = {
  action: string;
  cdata: string;
  challenge_ts: string;
  hostname: string;
  metadata: {
    interactive: boolean;
  };
  success: boolean;
};

export async function submitContactForm(
  currentState: { success: boolean; message: string } | null,
  formData: FormData
) {
  const { RECIPIENT, USER, PASS, HOST } = EMAIL;

  const name = formData.get('name') as string;
  const sender = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;
  const response = formData.get('cf-turnstile-response') as string;

  try {
    const { data: turnstileResponse } =
      await axios.post<CloudFlareVerificationResponse>(
        CLOUD_FLARE_TURNSTILE.VERIFY_URL,
        {
          secret: CLOUD_FLARE_TURNSTILE.SECRET_KEY,
          response: response,
        }
      );

    if (turnstileResponse.success) {
      const transporter = nodemailer.createTransport({
        host: HOST,
        port: 587,
        auth: {
          user: USER,
          pass: PASS,
        },
      });

      // TODO Improve error handling.
      await transporter.sendMail({
        from: USER,
        to: RECIPIENT,
        subject,
        text: `${message}\n\n${name}\n${sender}`,
      });

      return { success: true, message: 'Your email was sent!' };
    } else {
      return { success: false, message: 'Turnstile verification failed.' };
    }
    // TODO define and use error parameter.
  } catch (_) {
    return {
      success: false,
      message: 'Something went wrong sending an email.',
    };
  }
}

export default async function Page() {
  return <ContactPage />;
}
