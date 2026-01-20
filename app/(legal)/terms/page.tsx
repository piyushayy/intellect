import { Navbar } from "@/components/layout/Navbar";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="container mx-auto px-4 py-24 max-w-4xl">
                <h1 className="font-serif text-4xl text-slate-900 mb-8">Terms of Service</h1>
                <div className="prose prose-slate max-w-none">
                    <p className="lead text-lg text-slate-600 mb-8">
                        Welcome to Intellect. By accessing our platform, you agree to these terms.
                    </p>

                    <h3 className="font-bold text-lg mb-2">1. Usage</h3>
                    <p className="mb-6 text-slate-600">
                        Our platform is designed for educational purposes. You agree to use it only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.
                    </p>

                    <h3 className="font-bold text-lg mb-2">2. Content</h3>
                    <p className="mb-6 text-slate-600">
                        The questions, tests, and materials provided on Intellect are proprietary or sourced from public previous year question papers. You may not reproduce, distribute, or sell any content without permission.
                    </p>

                    <h3 className="font-bold text-lg mb-2">3. User Accounts</h3>
                    <p className="mb-6 text-slate-600">
                        You are responsible for maintaining the confidentiality of your account credentials. Intellect is not liable for any loss or damage arising from your failure to protect your password.
                    </p>

                    <h3 className="font-bold text-lg mb-2">4. Termination</h3>
                    <p className="mb-6 text-slate-600">
                        We reserve the right to suspend or terminate your account if you violate these terms or engage in harmful behavior on the platform.
                    </p>
                </div>
            </main>
        </div>
    );
}
