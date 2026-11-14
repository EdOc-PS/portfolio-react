const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Mesmos tokens do site (src/index.css) — tema escuro da versão nova.
const C = {
  bg: "#050505", // base-bg
  ink: "#FFFFFF", // base-ink
  muted: "#A1A1AA", // muted
  surface: "#1A1A1A", // surface (início do gradiente dos cards)
  surfaceDeep: "#121212", // surface-deep (fim do gradiente)
  line: "#262626", // borda padrão
  purple: "#7928CA", // accent-purple
  pink: "#FF0080", // accent-pink
  lime: "#CCF381", // accent-lime
};
const FONT_DISPLAY = "'Poppins', Arial, Helvetica, sans-serif";
const FONT_BODY = "'Plus Jakarta Sans', Arial, Helvetica, sans-serif";

// Gradiente dos cards; clientes que não suportam (Outlook) ficam com o bgcolor sólido.
const cardBg = `background-color:${C.surface};background-image:linear-gradient(135deg,${C.surface},${C.surfaceDeep});`;

const label = (text) =>
  `<p style="margin:0 0 8px;font-family:${FONT_BODY};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:${C.muted};">${text}</p>`;

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
  <title>Novo contato pelo portfólio</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${C.bg}" style="background:${C.bg};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Header: EDOC centralizado, como no site -->
          <tr>
            <td align="center" style="padding:0 0 24px;font-family:${FONT_DISPLAY};font-size:28px;font-weight:800;letter-spacing:-0.5px;color:${C.ink};">
              EDOC
            </td>
          </tr>

          <!-- Card principal (padrão .card: raio 32px, borda #262626, gradiente) -->
          <tr>
            <td bgcolor="${C.surface}" style="${cardBg}border:1px solid ${C.line};border-radius:32px;padding:36px 32px;">

              <!-- Faixa de destaque roxo → rosa (gradiente do número do card "Programando há") -->
              <div style="height:4px;width:56px;border-radius:999px;background-color:${C.purple};background-image:linear-gradient(90deg,${C.purple},${C.pink});margin:0 0 24px;"></div>

              <p style="margin:0 0 6px;font-family:${FONT_BODY};font-size:15px;font-weight:600;color:${C.lime};">Nova mensagem pelo portfólio</p>
              <h1 style="margin:0 0 28px;font-family:${FONT_DISPLAY};font-size:30px;line-height:1.15;font-weight:700;letter-spacing:-0.5px;color:${C.ink};">${safeName}</h1>

              ${label("E-mail")}
              <p style="margin:0 0 28px;font-family:${FONT_BODY};font-size:16px;">
                <a href="mailto:${safeEmail}" style="color:${C.ink};text-decoration:underline;text-decoration-color:${C.line};">${safeEmail}</a>
              </p>

              ${label("Mensagem")}
              <!-- Mesmo visual dos inputs do modal de contato -->
              <div style="${cardBg}border:1px solid ${C.line};border-radius:16px;padding:20px;font-family:${FONT_BODY};font-size:16px;line-height:1.65;color:${C.ink};">
                ${safeMessage}
              </div>

              <!-- Botão pílula branco, igual ao "Enviar mensagem" do modal -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td bgcolor="${C.ink}" style="background:${C.ink};border-radius:999px;">
                    <a href="mailto:${safeEmail}?subject=${encodeURIComponent("Re: contato pelo portfólio")}" style="display:inline-block;padding:15px 32px;font-family:${FONT_DISPLAY};font-size:15px;font-weight:700;color:#000000;text-decoration:none;">Responder</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Rodapé -->
          <tr>
            <td align="center" style="padding:24px 8px 0;font-family:${FONT_BODY};font-size:12px;line-height:1.6;color:${C.muted};">
              Enviado pelo formulário de contato do portfólio<br />
              <span style="color:${C.lime};">●</span>&nbsp; Responder este e-mail também responde para ${safeName}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
