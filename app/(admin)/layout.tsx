import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
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

    // Check role in DB
    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        redirect("/dashboard"); // or /404 to hide existence
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:block fixed h-full z-10">
                <div className="p-6 border-b border-slate-100">
                    <span className="text-xl font-bold tracking-tight text-indigo-600">Intellect Admin</span>
                </div>
                <nav className="p-4 space-y-1">
                    <Link href="/admin">
                        <Button variant="ghost" className="w-full justify-start text-slate-600">Dashboard</Button>
                    </Link>
                    <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Content
                    </div>
                    <Link href="/admin/questions">
                        <Button variant="ghost" className="w-full justify-start text-slate-600">All Questions</Button>
                    </Link>
                    <Link href="/admin/questions/new">
                        <Button variant="ghost" className="w-full justify-start text-slate-600">+ Add Question</Button>
                    </Link>

                    <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Exams
                    </div>
                    <Link href="/admin/tests">
                        <Button variant="ghost" className="w-full justify-start text-slate-600">Mock Tests</Button>
                    </Link>
                    <Link href="/admin/tests/new">
                        <Button variant="ghost" className="w-full justify-start text-slate-600">+ Create Test</Button>
                    </Link>

                    <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Users
                    </div>
                    <Link href="/admin/users">
                        <Button variant="ghost" className="w-full justify-start text-slate-600">Students</Button>
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
