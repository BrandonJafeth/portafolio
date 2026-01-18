import * as React from 'react';

interface ContactTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactTemplate: React.FC<ContactTemplateProps> = ({
  name,
  email,
  subject,
  message,
}) => (
  <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
    <h2 style={{ color: '#2563eb' }}>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <hr style={{ borderColor: '#eee', margin: '20px 0' }} />
    <h3>Message:</h3>
    <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>
      {message}
    </div>
  </div>
);
