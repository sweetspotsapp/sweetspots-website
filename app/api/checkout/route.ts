import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { locale } = await req.json();
  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!, // create a Price in Stripe Dashboard
          quantity: 1,
        },
      ],
      success_url: `${origin}/${locale}/early-bird-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/early-bird-cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
