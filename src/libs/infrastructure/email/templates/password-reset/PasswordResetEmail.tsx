/**
 * Password Reset Email Template
 *
 * Sent when user requests password reset.
 * Contains secure link valid for 1 hour.
 *
 * @context Email Templates - Password Reset
 */
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

import type { PasswordResetEmailProps } from './PasswordResetEmail.interfaces';

const main = {
  backgroundColor: '#FFB5E1',
  fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  margin: '40px auto',
  maxWidth: '600px',
  padding: '32px',
};

const header = {
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const logoText = {
  color: '#1A237E',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
};

const content = { padding: '0 16px' };

const h1 = {
  color: '#1A237E',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 16px',
  textAlign: 'center' as const,
};

const text = {
  color: '#4A5568',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
};

const warningBox = {
  backgroundColor: '#FFF3CD',
  border: '2px solid #FFC107',
  borderRadius: '12px',
  margin: '24px 0',
  padding: '20px',
  textAlign: 'center' as const,
};

const warningText = {
  color: '#856404',
  fontSize: '14px',
  margin: '0',
};

const ctaButton = {
  backgroundColor: '#FDD835',
  borderRadius: '50px',
  color: '#1A237E',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '14px 32px',
  textDecoration: 'none',
};

const ctaContainer = {
  margin: '32px 0',
  textAlign: 'center' as const,
};

const footer = {
  borderTop: '1px solid #E4E9F0',
  marginTop: '32px',
  paddingTop: '20px',
};

const footerText = {
  color: '#718096',
  fontSize: '12px',
  textAlign: 'center' as const,
};

export const PasswordResetEmail = ({ name, resetUrl }: PasswordResetEmailProps) => {
  const previewText = `Restablecer contraseña - Travel Savings App`;
  const [firstName] = name.split(' ');

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logoText}>Travel Savings App</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>Restablecer Contraseña</Heading>

            <Text style={text}>Hola {firstName},</Text>

            <Text style={text}>
              Recibimos una solicitud para restablecer la contraseña de tu cuenta en Travel Savings
              App. Haz clic en el siguiente botón para crear una nueva contraseña:
            </Text>

            <Section style={ctaContainer}>
              <Button href={resetUrl} style={ctaButton}>
                Restablecer Contraseña
              </Button>
            </Section>

            <Section style={warningBox}>
              <Text style={warningText}>Este enlace expira en 1 hora por seguridad.</Text>
            </Section>

            <Text style={text}>
              Si no solicitaste restablecer tu contraseña, puedes ignorar este correo. Tu contraseña
              actual permanecerá sin cambios.
            </Text>

            <Text style={text}>
              Si tienes problemas con el botón, copia y pega este enlace en tu navegador:
              <br />
              <span style={{ color: '#7C3AED', fontSize: '12px', wordBreak: 'break-all' as const }}>
                {resetUrl}
              </span>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Este correo fue enviado porque se solicitó restablecer la contraseña de tu cuenta.
              <br />
              Si no realizaste esta solicitud, contacta a soporte.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
