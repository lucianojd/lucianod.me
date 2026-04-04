'use server';

import ContactPage from './contact-page';
import { EMAIL, CLOUD_FLARE_TURNSTILE, RESEND_API_KEY } from '@src/constants';
import axios from 'axios';
import { Resend } from 'resend';
import ContactEmailTemplate from './contact-email-template';
import type { CloudFlareVerificationResponse } from '@src/types/cloudflare';



export async function submitContactForm(
  currentState: { success: boolean; message: string } | null,
  formData: FormData,
) {
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
        },
      );

    if (turnstileResponse.success) {
      const resend = new Resend(RESEND_API_KEY);

      const { error } = await resend.emails.send({
        from: `${name} <contact@lucianod.me>`,
        to: [EMAIL.RECIPIENT],
        subject: subject,
        react: (
          <ContactEmailTemplate message={message} name={name} email={sender} />
        ),
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Your email was sent!' };
    } else {
      return { success: false, message: 'Turnstile verification failed.' };
    }
    // TODO define and use error parameter.
  } catch (e) {
    return {
      success: false,
      message: 'Something went wrong sending an email.',
    };
  }
}

export default async function Page() {
  return <ContactPage />;
}
