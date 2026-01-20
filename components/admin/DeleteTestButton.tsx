'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';

export function DeleteTestButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this mock test? This will not delete the questions themselves.")) return;

        setLoading(true);
        try {
            const { error } = await supabase.from('mock_tests').delete().eq('id', id);
            if (error) throw error;
            router.refresh();
        } catch (error: any) {
            alert("Failed to delete test: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-rose-600 hover:bg-rose-50"
            onClick={handleDelete}
            disabled={loading}
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    );
}
