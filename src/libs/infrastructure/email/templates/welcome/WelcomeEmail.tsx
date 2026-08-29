/**
 * Welcome Email Template
 *
 * Sent when user completes signup.
 * Welcomes new participant to Travel Savings App platform.
 *
 * @context Email Templates - Welcome
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

import type { WelcomeEmailProps } from './WelcomeEmail.interfaces';

const APP_URL = 'https://travel-savings-app.vercel.app';

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

const highlightBox = {
  backgroundColor: '#FFF9C4',
  border: '2px solid #FDD835',
  borderRadius: '12px',
  margin: '24px 0',
  padding: '20px',
  textAlign: 'center' as const,
};

const highlightText = {
  color: '#1A237E',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const infoBox = {
  backgroundColor: '#F5F7FA',
  borderRadius: '8px',
  margin: '20px 0',
  padding: '16px',
};

const infoLabel = {
  color: '#718096',
  fontSize: '12px',
  fontWeight: 'bold',
  margin: '0 0 4px',
  textTransform: 'uppercase' as const,
};

const infoValue = {
  color: '#1A237E',
  fontSize: '16px',
  fontWeight: 'bold',
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

export const WelcomeEmail = ({ email, name }: WelcomeEmailProps) => {
  const previewText = `¡Bienvenido/a a Travel Savings App, ${name}!`;
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
            <Heading style={h1}>¡Hola {firstName}! 🎉</Heading>

            <Text style={text}>
              ¡Bienvenido/a a <strong>Travel Savings App</strong>! Nos emociona tenerte como parte
              de nuestra comunidad.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightText}>✅ Tu cuenta ha sido creada exitosamente</Text>
            </Section>

            <Section style={infoBox}>
              <Text style={infoLabel}>Tu información de registro</Text>
              <Text style={infoValue}>{name}</Text>
              <Text style={{ ...infoValue, color: '#4A5568', fontWeight: 'normal' }}>{email}</Text>
            </Section>

            <Text style={text}>
              Travel Savings App es una plataforma de <strong>retos y eventos</strong> diseñada para
              transformar vidas a través de experiencias significativas. Aquí podrás:
            </Text>

            <Text style={text}>
              ✨ Explorar eventos disponibles
              <br />
              🏃 Participar en retos físicos y emocionales
              <br />
              🎁 Recibir tu kit de participante
              <br />
              🏆 Completar desafíos y celebrar tus logros
            </Text>

            <Section style={ctaContainer}>
              <Button href={`${APP_URL}/login`} style={ctaButton}>
                Iniciar Sesión
              </Button>
            </Section>

            <Text style={text}>
              Si tienes alguna pregunta, no dudes en contactarnos a{' '}
              <a href='mailto:travel-savings-app@gmail.com' style={{ color: '#7C3AED' }}>
                travel-savings-app@gmail.com
              </a>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Este correo fue enviado a {email} porque te registraste en Travel Savings App.
              <br />© 2026 Travel Savings App - Rally Emocional
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
