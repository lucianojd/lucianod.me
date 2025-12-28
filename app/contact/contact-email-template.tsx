interface ContactEmailTemplateProps {
  message: string;
  name: string;
  email: string;
}

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
