'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong!</h2>
                <p className="text-slate-500 mb-8 text-sm">
                    We apologize for the inconvenience. Our team has been notified.
                </p>
                <Button
                    onClick={() => reset()}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                >
                    Try again
                </Button>
            </div>
        </div>
    );
}
