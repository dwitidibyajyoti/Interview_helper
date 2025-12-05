import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, price, currency } = await req.json();

    // --- store to DB if needed here ---

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER, // send to yourself
      subject: "New Early Access Registration",
      text: `
A new user registered interest:

Email: ${email}
Price willing to pay: ${price}
Currency: ${currency}
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 });
  }
}
