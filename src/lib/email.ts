/**
 * Email utility using AWS SES.
 * Fire-and-forget pattern — callers use `void sendEmail(...)` to avoid blocking.
 */

import { SESClient, SendEmailCommand, type SendEmailCommandInput } from '@aws-sdk/client-ses'

const ses = new SESClient({
  region: process.env.AWS_REGION ?? 'ap-southeast-1'
})

const EMAIL_FROM = process.env.EMAIL_FROM ?? 'noreply@giftofsong.com'

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

/**
 * Sends a transactional email via AWS SES.
 *
 * Designed for fire-and-forget usage:
 *   void sendEmail({ to, subject, html })
 *
 * Errors are logged but never thrown to avoid breaking the calling flow.
 */
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
  try {
    const params: SendEmailCommandInput = {
      Source: EMAIL_FROM,
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Subject: { Data: subject, Charset: 'UTF-8' },
        Body: {
          Html: { Data: html, Charset: 'UTF-8' }
        }
      }
    }

    await ses.send(new SendEmailCommand(params))
    console.log(`[Email] Sent "${subject}" to ${to}`)
  } catch (error) {
    // Never throw — caller uses fire-and-forget pattern
    console.error('[Email] Failed to send:', {
      to,
      subject,
      error: error instanceof Error ? error.message : String(error)
    })
  }
}
