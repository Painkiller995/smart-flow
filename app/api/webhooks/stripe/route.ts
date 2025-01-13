import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { HandleCheckoutSessionCompleted } from "@/lib/stripe/handle-checkout-session-completed";
import { stripe } from "@/lib/stripe/stripe";

export async function POST(request: Request) {

    const payload = await request.text()
    if (!payload) {
        console.error("Missing or empty payload in the request body");
        return NextResponse.json({ error: "Payload is required" }, { status: 400 });
    }

    const signature = (await headers()).get('stripe-signature') as string
    if (!signature) {
        console.error("Missing Stripe signature in headers");
        return new NextResponse("Missing Stripe signature", { status: 400 });
    }

    try {

        const event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)

        switch (event.type) {
            case "checkout.session.completed":
                HandleCheckoutSessionCompleted(event.data.object)
                break
            default:
                break
        }

        return NextResponse.json({ message: "Webhook received successfully" }, { status: 200 });
    } catch (error) {
        console.error("Stripe webhook validation failed:", error);
        return NextResponse.json({ error: "Webhook validation failed" }, { status: 400 });
    }
}
