import type { ContactEmailTemplateProps } from '@src/types/email';

export default function ContactEmailTemplate({
  message,
  name,
  email,
}: ContactEmailTemplateProps) {
  return (
    <div>
      <p>{message}</p>
      <p>From {name}</p>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    </div>
  );
}
