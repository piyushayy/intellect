import { Navbar } from "@/components/layout/Navbar";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="container mx-auto px-4 py-24 max-w-4xl">
                <h1 className="font-serif text-4xl text-slate-900 mb-8">Privacy Policy</h1>
                <div className="prose prose-slate max-w-none">
                    <p className="lead text-lg text-slate-600 mb-8">
                        Your privacy is important to us. This policy explains how we handle your data.
                    </p>

                    <h3 className="font-bold text-lg mb-2">1. Data Collection</h3>
                    <p className="mb-6 text-slate-600">
                        We collect your email, name, and study progress data (test scores, questions attempted) to provide a personalized learning experience.
                    </p>

                    <h3 className="font-bold text-lg mb-2">2. Usage of Data</h3>
                    <p className="mb-6 text-slate-600">
                        Your data is used to:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Track your learning progress and generate reports.</li>
                            <li>Sync your account across devices.</li>
                            <li>Send important updates about your account.</li>
                        </ul>
                    </p>

                    <h3 className="font-bold text-lg mb-2">3. Third Parties</h3>
                    <p className="mb-6 text-slate-600">
                        We do not sell your personal data. We use trusted service providers (like Supabase for database hosting) to operate our service.
                    </p>

                    <h3 className="font-bold text-lg mb-2">4. Your Rights</h3>
                    <p className="mb-6 text-slate-600">
                        You can request to export or delete your data at any time by contacting support.
                    </p>
                </div>
            </main>
        </div>
    );
}
