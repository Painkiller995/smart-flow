"use server"

import { getAppUrl } from "@/lib/helper/app-url"
import { stripe } from "@/lib/stripe/stripe"
import { getCreditsPack, PackId } from "@/types/credits"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


export async function PurchaseCredits(packId: PackId) {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    const selectedPack = getCreditsPack(packId)

    if (!selectedPack) {
        throw new Error("Invalid pack")
    }

    const priceId = selectedPack.priceId

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        invoice_creation: {
            enabled: true
        },
        success_url: getAppUrl('credits'),
        cancel_url: getAppUrl('credits'),
        metadata: {
            userId,
            packId
        },
        line_items: [
            {
                quantity: 1,
                price: selectedPack.priceId
            }
        ]
    })

    if (!session.url) {
        throw new Error('Cannot create Stripe session')
    }

    redirect(session.url)
}  