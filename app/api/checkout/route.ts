import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// OPTION A: map lookup keys you allow → use Stripe to resolve Price IDs
const ALLOWED_LOOKUP_KEYS = ["early_bird_monthly", "early_bird_yearly"] as const;
type LookupKey = (typeof ALLOWED_LOOKUP_KEYS)[number];

// OPTION B (instead of lookup keys): env-based allowlist of Price IDs
const PRICE_IDS = {
  monthly: process.env.STRIPE_PRICE_ID_MONTHLY!,
  yearly: process.env.STRIPE_PRICE_ID_YEARLY!,
};

export async function POST(req: Request) {
  try {
    const { locale, plan, lookupKey }: { locale?: string; plan?: "monthly" | "yearly"; lookupKey?: LookupKey } =
      await req.json();

    // Build your site origin safely (works on Vercel + local)
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

    // Resolve the price ID either via lookup key (A) or env map (B)
    let priceId: string;

    if (lookupKey) {
      if (!ALLOWED_LOOKUP_KEYS.includes(lookupKey)) {
        return NextResponse.json({ error: "Invalid price." }, { status: 400 });
      }
      const prices = await stripe.prices.list({ lookup_keys: [lookupKey], expand: ["data.product"] });
      console.log(prices)
      if (!prices.data[0]?.id) {
        return NextResponse.json({ error: "Price not found." }, { status: 400 });
      }
      priceId = prices.data[0].id;
    } else if (plan) {
      if (plan === "monthly") priceId = PRICE_IDS.monthly;
      else if (plan === "yearly") priceId = PRICE_IDS.yearly;
      else return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    } else {
      return NextResponse.json({ error: "Missing plan/lookupKey." }, { status: 400 });
    }

    // Create a subscription Checkout session (recurring!)
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // If you want promo codes on Checkout:
      allow_promotion_codes: true,
      // If you want to localize the hosted page:
      locale: (locale as Stripe.Checkout.SessionCreateParams.Locale) || "auto",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/${locale ?? "en"}/early-bird-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale ?? "en"}/early-bird-cancel`,
      customer_creation: "always",
      billing_address_collection: "auto",
      // Optional: attach metadata or client ref if you need it
      // client_reference_id: userId,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
