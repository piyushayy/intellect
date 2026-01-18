"use server";

import Razorpay from "razorpay";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createSubscriptionOrder(planType: 'monthly' | 'yearly') {
    const amount = planType === 'monthly' ? 499 * 100 : 4999 * 100; // in paisa

    try {
        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        });

        return { success: true, orderId: order.id, amount: order.amount };
    } catch (error) {
        console.error("Razorpay Error:", error);
        return { success: false, error: "Failed to create order" };
    }
}

export async function verifyPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
    planType: 'monthly' | 'yearly'
) {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return { success: false, error: "Invalid signature" };
    }

    // Payment Verified - Update DB
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: { get: (name) => cookieStore.get(name)?.value }
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "User not found" };

    const startDate = new Date();
    const endDate = new Date();
    if (planType === 'monthly') endDate.setMonth(endDate.getMonth() + 1);
    else endDate.setFullYear(endDate.getFullYear() + 1);

    const { error } = await supabase.from('subscriptions').insert({
        user_id: user.id,
        plan_id: planType,
        status: 'active',
        razorpay_order_id,
        razorpay_payment_id,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString()
    });

    if (error) {
        console.error("DB Error:", error);
        // Payment successful but DB failed - severe error, should log/alert
        return { success: false, error: "Payment verified but subscription update failed." };
    }

    revalidatePath('/dashboard');
    return { success: true };
}
