import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { subject, message, userName, userEmail } = await req.json()

    await resend.emails.send({
      from: 'Floorworld Conference App <onboarding@resend.dev>',
      to: ['surani@floorworld.com.au'],
      subject: `[Help Desk] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0095DA; padding: 20px 24px;">
            <h2 style="color: white; margin: 0; font-size: 18px;">New Help Desk Request</h2>
            <p style="color: #cce8f7; margin: 4px 0 0; font-size: 13px;">Floorworld Conference 2026 · KL August 16–21</p>
          </div>
          <div style="padding: 24px; background: #f9f9f9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #666; width: 100px;">From</td>
                <td style="padding: 8px 0; font-size: 14px; color: #111; font-weight: 600;">${userName || 'Unknown'} ${userEmail ? `(${userEmail})` : ''}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #666;">Topic</td>
                <td style="padding: 8px 0; font-size: 14px; color: #111; font-weight: 600;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 16px; background: white; border-radius: 8px; padding: 16px; border: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 14px; color: #333; line-height: 1.6;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px 24px; background: #eef7ff; border-top: 1px solid #d0e8f7;">
            <p style="margin: 0; font-size: 12px; color: #666;">Reply to this email to respond to the delegate, or log into the admin dashboard to view all requests.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Email notification error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
