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

  try {
    const { error } = await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>",
      to: "eeuardooctavio@gmail.com",
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
