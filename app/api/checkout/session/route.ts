import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer"],
    });

    // Prefer customer_details (from the Checkout form). Fallback to customer object.
    const email =
      session.customer_details?.email ??
      (typeof session.customer !== "string" && !(session.customer as Stripe.DeletedCustomer).deleted
        ? (session.customer as Stripe.Customer).email
        : undefined) ??
      null;

    const name =
      session.customer_details?.name ??
      (typeof session.customer !== "string"
        ? ((session.customer as Stripe.Customer).name as string | undefined)
        : undefined) ??
      null;

    return NextResponse.json({
      email,
      name,
      status: session.payment_status,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}