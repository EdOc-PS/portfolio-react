import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método não permitido" });
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Preencha todos os campos" });
  }

  if (
    typeof name !== "string" || typeof email !== "string" || typeof message !== "string" ||
    !name.trim() || !message.trim() ||
    name.length > 80 || email.length > 254 || message.length > 2000
  ) {
    return res.status(400).json({ success: false, message: "Campos inválidos ou acima do limite" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ success: false, message: "E-mail inválido" });
  }

  try {
    const { error } = await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "eeuardoprofissional@gmail.com",
      replyTo: email,
      subject: `Contato via portfólio — ${name}`,
      text: `${message}\n\n— ${name} (${email})`,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("send error:", err);
    return res.status(500).json({ success: false, message: "Erro ao enviar mensagem" });
  }
}
