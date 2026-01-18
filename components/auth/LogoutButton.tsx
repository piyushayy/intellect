"use client";

import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LogoutButtonProps {
    className?: string;
    variant?: "default" | "outline" | "secondary" | "ghost";
    showIcon?: boolean;
    text?: string;
}

export function LogoutButton({ className, variant = "ghost", showIcon = true, text = "Sign out" }: LogoutButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        router.push("/login"); // or /
        router.refresh();
        setLoading(false);
    };

    return (
        <Button
            variant={variant}
            className={className}
            onClick={handleLogout}
            disabled={loading}
        >
            {showIcon && <LogOut className="w-4 h-4 mr-2" />}
            {text}
        </Button>
    );
}
