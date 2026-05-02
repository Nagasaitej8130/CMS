import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Naga Sai Teja" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
}