"use server"

import prisma from "@/lib/prisma"
import { stripe } from "@/lib/stripe/stripe"
import { auth } from "@clerk/nextjs/server"

export async function DownloadInvoice(id: string) {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    const purchase = await prisma.userPurchase.findUnique({
        where: {
            id,
            userId
        }
    })

    if (!purchase) {
        throw new Error("Bad request")
    }

    const session = await stripe.checkout.sessions.retrieve(purchase.stripeId)

    if (!session.invoice) {
        throw new Error("Invoice not found")
    }

    const invoice = await stripe.invoices.retrieve(session.invoice as string)

    if (!invoice) {
        throw new Error("Invoice not found")
    }

    return invoice.hosted_invoice_url
}