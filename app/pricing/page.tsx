"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { createSubscriptionOrder, verifyPayment } from "@/app/actions/payment"; // You'll create this
import { Check, Loader2 } from "lucide-react";
import Script from "next/script";
import { useRouter } from "next/navigation";

// Define the Razorpay type globally if not installed types
declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PricingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
        setLoading(plan);

        // 1. Create Order
        const { success, orderId, amount, error } = await createSubscriptionOrder(plan);

        if (!success || !orderId) {
            alert("Failed to initiate payment: " + error);
            setLoading(null);
            return;
        }

        // 2. Open Razorpay Checktout
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: amount,
            currency: "INR",
            name: "Intellect Education",
            description: `${plan === 'monthly' ? 'Monthly' : 'Yearly'} Premium Subscription`,
            order_id: orderId,
            handler: async function (response: any) {
                // 3. Verify Payment
                const res = await verifyPayment(
                    response.razorpay_order_id,
                    response.razorpay_payment_id,
                    response.razorpay_signature,
                    plan
                );

                if (res.success) {
                    alert("Welcome to Premium! 🎉");
                    router.push('/dashboard');
                } else {
                    alert("Payment Verification Failed: " + res.error);
                }
                setLoading(null);
            },
            prefill: {
                name: "Student Name",
                email: "student@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#4f46e5"
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="max-w-5xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Simple, transparent pricing</h1>
                <p className="text-xl text-slate-600">Invest in your future for less than the cost of a coffee.</p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                {/* Free Plan */}
                <div className="bg-white p-8 rounded-3xl border border-slate-200">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
                    <p className="text-slate-500 mb-6">For exploring the platform</p>
                    <div className="text-4xl font-bold text-slate-900 mb-8">₹0</div>

                    <ul className="space-y-4 mb-8 text-left text-slate-600">
                        <li className="flex gap-3"><Check className="w-5 h-5 text-indigo-600" /> access to 100 questions</li>
                        <li className="flex gap-3"><Check className="w-5 h-5 text-indigo-600" /> 1 Mock Test</li>
                        <li className="flex gap-3"><Check className="w-5 h-5 text-indigo-600" /> Limited explanations</li>
                    </ul>

                    <Button variant="outline" className="w-full h-12 rounded-xl" disabled>Current Plan</Button>
                </div>

                {/* Premium Plan */}
                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 text-white relative transform md:scale-105 shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                        Best Value
                    </div>

                    <h3 className="text-2xl font-bold mb-2">Premium</h3>
                    <p className="text-slate-400 mb-6">For serious aspirants</p>
                    <div className="text-4xl font-bold mb-1">₹499<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                    <p className="text-sm text-slate-400 mb-8">or ₹4999/year (Save 20%)</p>

                    <ul className="space-y-4 mb-8 text-left text-slate-300">
                        <li className="flex gap-3"><Check className="w-5 h-5 text-indigo-400" /> Unlimited questions</li>
                        <li className="flex gap-3"><Check className="w-5 h-5 text-indigo-400" /> Full Mock Test Series</li>
                        <li className="flex gap-3"><Check className="w-5 h-5 text-indigo-400" /> Detailed Explanations</li>
                        <li className="flex gap-3"><Check className="w-5 h-5 text-indigo-400" /> Priority Support</li>
                    </ul>

                    <div className="space-y-3">
                        <Button
                            className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                            onClick={() => handleSubscribe('monthly')}
                            disabled={!!loading}
                        >
                            {loading === 'monthly' ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get Monthly Access"}
                        </Button>
                        <Button
                            className="w-full h-12 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/10"
                            onClick={() => handleSubscribe('yearly')}
                            disabled={!!loading}
                        >
                            {loading === 'yearly' ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get Yearly Access"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
