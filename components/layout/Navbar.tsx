"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { LogoutButton } from "@/components/auth/LogoutButton";

export function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check active session
        supabase.auth.getUser().then(async ({ data }) => {
            const currentUser = data.user;
            setUser(currentUser);
            if (currentUser) {
                // Check metadata first
                const metaRole = currentUser.user_metadata?.role;
                if (metaRole === 'admin' || metaRole === 'moderator') {
                    setIsAdmin(true);
                } else {
                    // Check DB
                    const { data: profile } = await supabase
                        .from('users')
                        .select('role')
                        .eq('id', currentUser.id)
                        .single();
                    if (profile?.role === 'admin' || profile?.role === 'moderator') {
                        setIsAdmin(true);
                    }
                }
            }
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            const currentUser = session?.user || null;
            setUser(currentUser);
            if (currentUser) {
                const metaRole = currentUser.user_metadata?.role;
                if (metaRole === 'admin' || metaRole === 'moderator') {
                    setIsAdmin(true);
                } else {
                    const { data: profile } = await supabase.from('users').select('role').eq('id', currentUser.id).single();
                    setIsAdmin(profile?.role === 'admin' || profile?.role === 'moderator');
                }
            } else {
                setIsAdmin(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">I</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">Intellect</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/practice" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                        Practice
                    </Link>
                    <Link href="/pyq" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                        PYQs
                    </Link>
                    <Link href="/tests" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                        Mock Tests
                    </Link>
                    <Link href="/mistakes" className="text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors">
                        Mistakes
                    </Link>
                    {isAdmin && (
                        <Link href="/admin" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                            Admin Panel
                        </Link>
                    )}
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            {isAdmin ? (
                                <Link href="/admin">
                                    <Button variant="ghost" size="sm">Admin Panel</Button>
                                </Link>
                            ) : (
                                <Link href="/dashboard">
                                    <Button variant="ghost" size="sm">Dashboard</Button>
                                </Link>
                            )}
                            <LogoutButton variant="ghost" showIcon={false} />
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">Sign In</Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6">Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger Button */}
                <div className="flex md:hidden items-center gap-4">
                    <button className="text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-4 z-40">
                    <Link href="/practice" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-600 py-2">Practice</Link>
                    <Link href="/pyq" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-600 py-2">PYQs</Link>
                    <Link href="/tests" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-600 py-2">Mock Tests</Link>
                    <Link href="/mistakes" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-600 py-2">Mistakes</Link>
                    <hr className="border-slate-100" />
                    {user ? (
                        <>
                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full justify-center">Dashboard</Button>
                            </Link>
                            <div className="flex justify-center">
                                <LogoutButton variant="ghost" />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full">Sign In</Button>
                            </Link>
                            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button className="w-full">Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
