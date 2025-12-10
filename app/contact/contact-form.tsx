'use client'

import { useActionState, useEffect } from "react";
import { submitContactForm } from "./page";
import { CLOUD_FLARE_TURNSTILE } from "@app/_constants";
import Form from "next/form";

export default function ContactForm() {
    const [formState, formAction, isPending] = useActionState(submitContactForm, null);

    return (
        <Form action={formAction}>
            <input disabled={isPending} type="text" name="name" placeholder="Your Name" required />
            <input disabled={isPending} type="email" name="email" placeholder="Your Email" required />
            <input disabled={isPending} type="text" name="subject" placeholder="Subject" required />
            <textarea disabled={isPending} name="message" placeholder="Your Message" required></textarea>
            {/* <div className="cf-turnstile" data-sitekey={CLOUD_FLARE_TURNSTILE.SITE_KEY}></div> */}
            <button disabled={isPending} type="submit">{isPending ? "Sending..." : "Send Message"}</button>
        </Form>    
    )
}