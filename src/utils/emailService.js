// INTEGRACIÓN FUTURA:
// - SendGrid: https://sendgrid.com/docs/api-reference/mail-send/mail-send/
// - Resend:   https://resend.com/docs/api-reference/emails/send-email
// - Implementación real requiere backend (Edge Function en Supabase o Next.js API Route)
// - Ejemplo SendGrid: POST https://api.sendgrid.com/v3/mail/send con bearer token

export function sendAlertEmail(tipo, datos, email) {
  const timestamp = new Date().toLocaleString('es-CL');

  console.log(
    `[EmailService ${timestamp}] tipo="${tipo}" → ${email}`,
    datos
  );

  // Simulación: en producción aquí iría fetch() a SendGrid o Resend
  return Promise.resolve({
    success: true,
    messageId: `mock_${Date.now()}`,
    sentAt: timestamp,
    to: email,
    tipo,
    datos,
  });
}
