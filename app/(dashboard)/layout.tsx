import { Navbar } from "@/components/layout/Navbar";
import { requireUser } from "@/lib/auth-checks";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Protect the dashboard
    await requireUser();

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
