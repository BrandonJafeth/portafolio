import { ContactTemplate } from '@/components/email/ContactTemplate';
import { ConfirmationTemplate } from '@/components/email/ConfirmationTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import siteConfig from '@/config/site.config';
import { z } from 'zod';
import { LRUCache } from 'lru-cache';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(100, "Subject must be less than 100 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

// Rate limit cache (IP based) - Allow 3 requests per hour per IP
const rateLimit = new LRUCache<string, { count: number; lastRequest: number }>({
  max: 500, // Maximum number of IPs to track
  ttl: 1000 * 60 * 60, // 1 hour time to live
});

const MAX_REQUESTS_PER_HOUR = 3;

export async function POST(request: Request) {
  console.log("Attempting to send email...");
  
  if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  // 1. Rate Limiting
  const ip = (await headers()).get('x-forwarded-for') ?? 'anonymous';
  const currentLimit = rateLimit.get(ip);
  
  if (currentLimit && currentLimit.count >= MAX_REQUESTS_PER_HOUR) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 } 
      );
  }

  try {
    const body = await request.json();

    // 2. Validation
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
        return NextResponse.json(
            { error: 'Validation failed', details: validationResult.error.format() },
            { status: 400 }
        );
    }

    const { name, email, subject, message } = validationResult.data;

    // Update rate limit
    rateLimit.set(ip, {
        count: (currentLimit?.count || 0) + 1,
        lastRequest: Date.now()
    });


    // 3. Send notification to Admin (You)
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

    // 4. Send confirmation to the User (Sender)
    const userData = await resend.emails.send({
      from: 'Brandon Carrillo <info@brandondev.me>',
      to: [email],
      subject: "I've received your message - Brandon Carrillo",
      react: ConfirmationTemplate({ name }),
    });
    
    if (userData.error) {
         console.warn("Resend API Warning (User Confirmation):", userData.error);
         // We don't fail the request if just the confirmation fails
    }

    return NextResponse.json({ success: true, admin: adminData, user: userData });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error details logged on server' }, { status: 500 });
  }
}
