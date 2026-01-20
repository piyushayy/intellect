import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { UserRoleToggle } from "@/components/admin/UserRoleToggle";

async function getUsers() {
    // Note: Can't easily select from auth.users via client, need admin client or view
    // Using public.users table (which we sync)
    const { data } = await supabase.from('users').select('*').order('created_at', { ascending: false }).limit(20);
    return data || [];
}

export default async function AdminUsersPage() {
    const users = await getUsers();

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Name</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Email</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Joined</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 group">
                                <td className="p-4 font-medium text-slate-900">{user.full_name}</td>
                                <td className="p-4 text-slate-600">{user.email}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {user.role || 'student'}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-500 text-sm">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right">
                                    <UserRoleToggle userId={user.id} currentRole={user.role || 'student'} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
