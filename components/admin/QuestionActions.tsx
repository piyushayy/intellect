'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { deleteQuestion } from "@/app/actions/admin";

export function DeleteQuestionButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this question?")) return;

        setLoading(true);
        try {
            await deleteQuestion(id);
        } catch (error) {
            alert("Failed to delete question");
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
