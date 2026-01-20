import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-md">
                <h1 className="font-serif text-9xl text-indigo-100 font-bold mb-4">404</h1>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Page not found</h2>
                <p className="text-slate-600 mb-8">
                    The page you are looking for doesn't exist or has been moved.
                    Let's get you back to learning.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/">
                        <Button variant="outline">Go Home</Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Go to Dashboard</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
