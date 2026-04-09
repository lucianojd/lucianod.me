'use client';

import { useActionState } from 'react';
import { submitContactForm } from './page';
import Form from 'next/form';
import dynamic from 'next/dynamic';

const Turnstile = dynamic(() => import('@src/components/cloudflare-turnstile'), {
  ssr: false,
});

export default function ContactForm() {
  const [formState, formAction, isPending] = useActionState(
    submitContactForm,
    null,
  );

  if (formState == null) {
    return (
      <Form action={formAction}>
        <input
          disabled={isPending}
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />
        <input
          disabled={isPending}
          type="email"
          name="email"
          placeholder="Your Email"
          required
        />
        <input
          disabled={isPending}
          type="text"
          name="subject"
          placeholder="Subject"
          required
        />
        <textarea
          rows={10}
          disabled={isPending}
          name="message"
          placeholder="Your Message"
          required
        />
        <Turnstile />
        <button disabled={isPending} type="submit">
          {isPending ? 'Sending...' : 'Send Message'}
        </button>
      </Form>
    );
  } else if (formState.success) {
    return <h1>Your email was sent!</h1>;
  } else {
    return <h1>Oh no! Something went wrong. Your email could not be sent.</h1>;
  }
}
