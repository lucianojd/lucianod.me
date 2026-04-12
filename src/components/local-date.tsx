'use client';

// This must be imported using the dynamic import in order to prevent hydration errors, since it relies on the user's locale.
export default function LocalDateInjector({
  date,
  component,
}: {
  date?: string;
  component: (localDate: string) => React.ReactNode;
}) {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  const localDate = date ? new Date(date) : new Date();
  const localDateString = localDate.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return <>{component(localDateString)}</>;
}
