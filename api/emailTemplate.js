const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Mesmas cores e fontes do design system do site (src/index.css).
const COLORS = {
  bg: "#1F1F1F", // base-ink (fundo do footer)
  ink: "#FBF9EF", // base-bg (texto)
  soft: "#8F8D85", // bg-soft
  card: "#2E2E2C", // glass-dark
  field: "#3A3A38",
};
const FONT_DISPLAY = "'Poppins', Arial, Helvetica, sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', Arial, Helvetica, sans-serif";

export function contactEmailHtml({ name, email, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&family=Poppins:wght@700;800&display=swap" rel="stylesheet" />
  <title>Novo contato</title>
</head>
<body style="margin:0;padding:0;background:${COLORS.bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bg};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <tr>
            <td style="padding:0 8px 20px;font-family:${FONT_DISPLAY};font-size:24px;font-weight:800;letter-spacing:-0.5px;color:${COLORS.ink};">
              EDOC
            </td>
          </tr>
          <tr>
            <td style="background:${COLORS.card};border-radius:24px;padding:32px;">
              <p style="margin:0 0 4px;font-family:${FONT_BODY};font-size:13px;color:${COLORS.soft};">Nova mensagem pelo portfólio</p>
              <h1 style="margin:0 0 24px;font-family:${FONT_DISPLAY};font-size:26px;line-height:1.2;font-weight:700;color:${COLORS.ink};">${safeName}</h1>

              <p style="margin:0 0 4px;font-family:${FONT_BODY};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:${COLORS.soft};">E-mail</p>
              <p style="margin:0 0 24px;font-family:${FONT_BODY};font-size:16px;color:${COLORS.ink};">
                <a href="mailto:${safeEmail}" style="color:${COLORS.ink};">${safeEmail}</a>
              </p>

              <p style="margin:0 0 8px;font-family:${FONT_BODY};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:${COLORS.soft};">Mensagem</p>
              <div style="background:${COLORS.field};border-radius:16px;padding:20px;font-family:${FONT_BODY};font-size:16px;line-height:1.6;color:${COLORS.ink};">
                ${safeMessage}
              </div>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td style="background:${COLORS.ink};border-radius:999px;">
                    <a href="mailto:${safeEmail}" style="display:inline-block;padding:14px 28px;font-family:${FONT_DISPLAY};font-size:15px;font-weight:700;color:#1F1F1F;text-decoration:none;">Responder</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px 8px 0;font-family:${FONT_BODY};font-size:12px;color:${COLORS.soft};">
              Enviado pelo formulário de contato do portfólio
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
