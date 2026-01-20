import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LogoutButton } from "@/components/auth/LogoutButton";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Check role in metadata first (faster) then DB
    const metadataRole = user.user_metadata?.role;

    if (metadataRole !== 'admin' && metadataRole !== 'moderator') {
        const { data: profile } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profile?.role !== 'admin' && profile?.role !== 'moderator') {
            redirect("/dashboard");
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:block fixed h-full z-10">
                <div className="p-6 border-b border-slate-900 bg-slate-900 text-white">
                    <span className="text-xl font-bold tracking-tight">Intellect CRM</span>
                </div>
                <nav className="p-4 space-y-1 bg-slate-900 h-full text-slate-300">
                    <Link href="/admin">
                        <Button variant="ghost" className="w-full justify-start hover:text-white hover:bg-slate-800">Dashboard</Button>
                    </Link>

                    <div className="pt-6 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Management
                    </div>
                    <Link href="/admin/upload">
                        <Button variant="ghost" className="w-full justify-start hover:text-white hover:bg-slate-800">Bulk Upload</Button>
                    </Link>
                    <Link href="/admin/questions">
                        <Button variant="ghost" className="w-full justify-start hover:text-white hover:bg-slate-800">Question Bank</Button>
                    </Link>

                    <div className="pt-6 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Exams
                    </div>
                    <Link href="/admin/tests">
                        <Button variant="ghost" className="w-full justify-start hover:text-white hover:bg-slate-800">Mock Tests</Button>
                    </Link>

                    <div className="pt-6 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        System
                    </div>
                    <Link href="/admin/users">
                        <Button variant="ghost" className="w-full justify-start hover:text-white hover:bg-slate-800">Userbase</Button>
                    </Link>

                    <div className="pt-4 mt-auto border-t border-slate-100">
                        <LogoutButton className="w-full justify-start text-rose-600 hover:text-rose-700 hover:bg-rose-50" text="Log Out" />
                    </div>
                </nav>
            </aside>

            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
