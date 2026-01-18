import { Navbar } from "@/components/layout/Navbar";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <Navbar />
            <div className="max-w-4xl mx-auto py-20 px-6">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <p className="text-slate-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-slate max-w-none">
                    <h3>1. Agreement to Terms</h3>
                    <p>
                        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Intellect regarding your access to and use of the website.
                    </p>

                    <h3>2. Intellectual Property Rights</h3>
                    <p>
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) are owned or controlled by us.
                    </p>

                    <h3>3. User Registration</h3>
                    <p>
                        You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password.
                    </p>

                    <h3>4. Purchases and Payment</h3>
                    <p>
                        We accept payments through Razorpay. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site.
                    </p>

                    <h3>5. Educational Content Disclaimer</h3>
                    <p>
                        The materials on Intellect are provided for educational purposes only. While we strive for accuracy, we cannot guarantee that all information is free of errors. We are not liable for any exam results.
                    </p>

                    <h3>6. Contact Us</h3>
                    <p>
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at support@intellect.education.
                    </p>
                </div>
            </div>
        </div>
    );
}
