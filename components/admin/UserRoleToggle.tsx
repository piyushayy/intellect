'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';

export function UserRoleToggle({ userId, currentRole }: { userId: string, currentRole: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const toggleRole = async () => {
        setLoading(true);
        const newRole = currentRole === 'admin' ? 'student' : 'admin';

        try {
            // Update the users table
            const { error: dbError } = await supabase
                .from('users')
                .update({ role: newRole })
                .eq('id', userId);

            if (dbError) throw dbError;

            // Note: In a real app, you'd also want to update the auth metadata 
            // but that usually requires an admin client / service role.
            // For now, we'll suggest reaching out if metadata is out of sync.

            router.refresh();
        } catch (error: any) {
            alert("Error updating role: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={toggleRole}
            disabled={loading}
            className={currentRole === 'admin' ? 'text-amber-600 border-amber-200' : 'text-indigo-600 border-indigo-200'}
        >
            {loading ? '...' : currentRole === 'admin' ? 'Demote to Student' : 'Promote to Admin'}
        </Button>
    );
}
