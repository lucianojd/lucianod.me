'use client'

import { getStandardFromDate } from "@src/utils";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const RedirectToToday = () => {
    const date = new Date();
    const dateStr = getStandardFromDate(date);
    redirect(`/apod/${dateStr}`);
    return <div />;
}

const DynamicRedirectToToday = dynamic(() => Promise.resolve(RedirectToToday), { ssr: false });

export default function APODRedirect() {
    return <section id="apod-redirect">
        <h1>Redirecting to today's APOD...</h1>
        <DynamicRedirectToToday />
    </section>;
}