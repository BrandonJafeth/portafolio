import { ContactTemplate } from '@/components/email/ContactTemplate';
import { ConfirmationTemplate } from '@/components/email/ConfirmationTemplate'; // Import confirmation template
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import siteConfig from '@/config/site.config';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log("Attempting to send email...");
  if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Send notification to Brandon (You)
    const adminData = await resend.emails.send({
      from: 'Brandon Carrillo <info@brandondev.me>', 
      to: [siteConfig.contactEmail], 
      subject: `Portfolio Contact: ${subject}`,
      react: ContactTemplate({ name, email, subject, message }),
      replyTo: email,
    });

    if (adminData.error) {
      console.error("Resend API Error (Admin):", adminData.error);
      return NextResponse.json({ error: adminData.error }, { status: 500 });
    }

    // 2. Send confirmation to the User (Sender)
    const userData = await resend.emails.send({
      from: 'Brandon Carrillo <info@brandondev.me>',
      to: [email],
      subject: "I've received your message - Brandon Carrillo",
      react: ConfirmationTemplate({ name }),
    });
    
    if (userData.error) {
         console.warn("Resend API Warning (User Confirmation):", userData.error);
         // We don't fail the request if just the confirmation fails, but we log it.
    }

    return NextResponse.json({ success: true, admin: adminData, user: userData });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error details logged on server' }, { status: 500 });
  }
}
