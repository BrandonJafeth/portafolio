import * as React from 'react';

interface ConfirmationTemplateProps {
  name: string;
}

export const ConfirmationTemplate: React.FC<ConfirmationTemplateProps> = ({
  name,
}) => (
  <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
    <h2 style={{ color: '#2563eb' }}>Message Received</h2>
    <p>Hi {name},</p>
    <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
    <p>Best regards,</p>
    <p><strong>Brandon Carrillo</strong><br/>Full Stack Developer</p>
    <p style={{ fontSize: '12px', color: '#888', marginTop: '20px' }}>
        This is an automated confirmation. Please do not reply to this email directly.
    </p>
  </div>
);
