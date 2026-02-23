/**
 * "Your Song is Being Crafted" email — sent BEFORE payment.
 * Warm tone, includes order summary + "Complete Your Order" retry link.
 */

import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import { render } from '@react-email/render'

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? 'support@giftofsong.com'

interface OrderCreatedEmailProps {
  buyerName: string
  recipientName: string
  occasion: string
  genre: string
  vibe: string
  plan: string
  orderId: string
  retryPaymentUrl: string
}

function OrderCreatedEmail({
  buyerName,
  recipientName,
  occasion,
  genre,
  vibe,
  plan,
  orderId,
  retryPaymentUrl
}: OrderCreatedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{'Your song for ' + recipientName + ' is being crafted!'}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Heading style={logoStyle}>GiftOfSong</Heading>
          </Section>

          <Section style={contentStyle}>
            <Heading as='h1' style={headingStyle}>
              {'Your Song is Being Crafted! \uD83C\uDFB6'}
            </Heading>

            <Text style={textStyle}>{'Hi ' + buyerName + ','}</Text>

            <Text style={textStyle}>
              {"We're so excited to create something special for " +
                recipientName +
                "! Here's what our Song Chef will be working with:"}
            </Text>

            <Section style={cardStyle}>
              <Text style={cardTitleStyle}>Your Song Details</Text>
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
              <Text style={orderIdStyle}>{'Order ID: ' + orderId}</Text>
            </Section>

            <Section style={ctaContainerStyle}>
              <Button style={buttonStyle} href={retryPaymentUrl}>
                {'Complete Your Order \u2192'}
              </Button>
            </Section>

            <Text style={subtleNoteStyle}>
              {"If you've already completed your order, sit tight \u2014 a confirmation is on its way!"}
            </Text>
          </Section>

          <Hr style={hrStyle} />
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              {'Questions? Reach out to us at '}
              <a href={'mailto:' + SUPPORT_EMAIL} style={linkStyle}>
                {SUPPORT_EMAIL}
              </a>
            </Text>
            <Text style={footerTextStyle}>
              {'\u00A9 ' + new Date().getFullYear() + ' GiftOfSong. Made with \u2764\uFE0F'}
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
  border: '1px solid #E07A5F33'
}

const cardTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 600,
  color: '#E07A5F',
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

const ctaContainerStyle: React.CSSProperties = {
  textAlign: 'center' as const,
  margin: '32px 0'
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#E07A5F',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: 600,
  padding: '14px 32px',
  borderRadius: '50px',
  textDecoration: 'none',
  display: 'inline-block'
}

const subtleNoteStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#3D405B99',
  textAlign: 'center' as const,
  fontStyle: 'italic',
  margin: '0 0 16px'
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

export async function buildOrderCreatedEmail(props: OrderCreatedEmailProps): Promise<string> {
  return render(OrderCreatedEmail(props))
}
