import { Navbar } from "@/components/layout/Navbar";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <Navbar />
            <div className="max-w-4xl mx-auto py-20 px-6">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-slate-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-slate max-w-none">
                    <h3>1. Introduction</h3>
                    <p>
                        Welcome to Intellect ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                        When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously.
                    </p>

                    <h3>2. Information We Collect</h3>
                    <p>
                        We collect personal information that you voluntarily provide to us when registering at the Services expressing an interest in obtaining information about us or our products and services,
                        when participating in activities on the Services or otherwise contacting us.
                    </p>
                    <ul>
                        <li><strong>Personal Data:</strong> Name, Email address, Payment information (processed by Razorpay).</li>
                        <li><strong>Usage Data:</strong> Learning progress, quiz scores, time spent on questions.</li>
                    </ul>

                    <h3>3. How We Use Your Information</h3>
                    <p>
                        We use personal information collected via our Services for a variety of business purposes described below:
                    </p>
                    <ul>
                        <li>To facilitate account creation and logon process.</li>
                        <li>To send you learning reminders and progress reports.</li>
                        <li>To fulfill and manage your orders and subscription.</li>
                    </ul>

                    <h3>4. Sharing Your Information</h3>
                    <p>
                        We strictly do not share, sell, or rent your personal information to third parties for their marketing purposes.
                        We may share data with trusted service providers (like payment processors) solely to provide the Service.
                    </p>

                    <h3>5. Contact Us</h3>
                    <p>
                        If you have questions or comments about this policy, you may email us at support@intellect.education.
                    </p>
                </div>
            </div>
        </div>
    );
}
