/**
 * "Thank You" email — sent AFTER webhook confirms payment.
 * Warm tone, order summary, refinement info, wait-for-contact note.
 */

import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import { render } from '@react-email/render'

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? 'support@giftofsong.com'

interface OrderThankYouEmailProps {
  buyerName: string
  recipientName: string
  occasion: string
  genre: string
  vibe: string
  plan: string
  orderId: string
  amountPaid: string
}

function OrderThankYouEmail({
  buyerName,
  recipientName,
  occasion,
  genre,
  vibe,
  plan,
  orderId,
  amountPaid
}: OrderThankYouEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`Your song for ${recipientName} is confirmed!`}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Heading style={logoStyle}>GiftOfSong</Heading>
          </Section>

          <Section style={contentStyle}>
            <Heading as='h1' style={headingStyle}>
              {`Thank You, ${buyerName}! \uD83C\uDF89`}
            </Heading>

            <Text style={textStyle}>
              {"Your order is confirmed and our Song Chef is warming up! We can't wait to craft something truly special for " +
                recipientName +
                '.'}
            </Text>

            <Section style={cardStyle}>
              <Text style={cardTitleStyle}>{'Order Confirmed \u2705'}</Text>
              <Text style={detailRowStyle}>
                <strong>For:</strong> {recipientName}
              </Text>
              <Text style={detailRowStyle}>
                <strong>Occasion:</strong> {occasion}
              </Text>
              <Text style={detailRowStyle}>
                <strong>Genre:</strong> {genre}
              </Text>
              <Text style={detailRowStyle}>
                <strong>Vibe:</strong> {vibe}
              </Text>
              <Text style={detailRowStyle}>
                <strong>Plan:</strong> {plan}
              </Text>
              <Text style={detailRowStyle}>
                <strong>Amount:</strong> {amountPaid}
              </Text>
              <Text style={orderIdStyle}>{`Order ID: ${orderId}`}</Text>
            </Section>

            <Section style={whatsNextStyle}>
              <Heading as='h2' style={subheadingStyle}>
                What Happens Next?
              </Heading>
              <Text style={stepStyle}>{'\uD83C\uDFBC Our Song Chef starts crafting your personalized song'}</Text>
              <Text style={stepStyle}>{"\uD83D\uDCE7 We'll reach out to you when your song draft is ready"}</Text>
              <Text style={stepStyle}>{"\uD83C\uDFA7 You'll get to listen and request revisions"}</Text>
            </Section>

            <Section style={noteStyle}>
              <Text style={noteTitleStyle}>{'\uD83D\uDCA1 Want to adjust your song details?'}</Text>
              <Text style={noteTextStyle}>
                {'You can always refine your preferences \u2014 just reply to this email or contact us at '}
                <a href={`mailto:${SUPPORT_EMAIL}`} style={linkStyle}>
                  {SUPPORT_EMAIL}
                </a>
                {" with your Order ID. We're happy to tweak things before production starts!"}
              </Text>
            </Section>
          </Section>

          <Hr style={hrStyle} />
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              {"Questions? We're here to help: "}
              <a href={`mailto:${SUPPORT_EMAIL}`} style={linkStyle}>
                {SUPPORT_EMAIL}
              </a>
            </Text>
            <Text style={footerTextStyle}>
              {`\u00A9 ${new Date().getFullYear()} GiftOfSong. Made with \u2764\uFE0F`}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// --- Styles ---

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#FFF8F0',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  margin: 0,
  padding: 0
}

const containerStyle: React.CSSProperties = {
  maxWidth: '560px',
  margin: '0 auto'
}

const headerStyle: React.CSSProperties = {
  padding: '32px 24px 0',
  textAlign: 'center' as const
}

const logoStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#E07A5F',
  margin: 0
}

const contentStyle: React.CSSProperties = {
  padding: '24px'
}

const headingStyle: React.CSSProperties = {
  fontSize: '28px',
  color: '#3D405B',
  textAlign: 'center' as const,
  margin: '0 0 24px'
}

const subheadingStyle: React.CSSProperties = {
  fontSize: '20px',
  color: '#3D405B',
  margin: '0 0 16px'
}

const textStyle: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#3D405B',
  margin: '0 0 16px'
}

const cardStyle: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  borderRadius: '16px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #81B29A44'
}

const cardTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 600,
  color: '#81B29A',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  margin: '0 0 16px'
}

const detailRowStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#3D405B',
  margin: '0 0 8px',
  lineHeight: '1.5'
}

const orderIdStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#81B29A',
  margin: '16px 0 0',
  fontFamily: 'monospace'
}

const whatsNextStyle: React.CSSProperties = {
  margin: '24px 0'
}

const stepStyle: React.CSSProperties = {
  fontSize: '15px',
  color: '#3D405B',
  margin: '0 0 12px',
  lineHeight: '1.5'
}

const noteStyle: React.CSSProperties = {
  backgroundColor: '#F2CC8F22',
  borderRadius: '12px',
  padding: '20px',
  margin: '24px 0',
  borderLeft: '4px solid #F2CC8F'
}

const noteTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 600,
  color: '#3D405B',
  margin: '0 0 8px'
}

const noteTextStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#3D405B',
  lineHeight: '1.6',
  margin: 0
}

const hrStyle: React.CSSProperties = {
  borderColor: '#E07A5F22',
  margin: '0 24px'
}

const footerStyle: React.CSSProperties = {
  padding: '24px',
  textAlign: 'center' as const
}

const footerTextStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#3D405B80',
  margin: '0 0 8px'
}

const linkStyle: React.CSSProperties = {
  color: '#E07A5F'
}

// --- Render + Export ---

export async function buildOrderThankYouEmail(props: OrderThankYouEmailProps): Promise<string> {
  return render(OrderThankYouEmail(props))
}
