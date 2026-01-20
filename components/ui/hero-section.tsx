import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility from shadcn/ui
import { Button } from "@/components/ui/Button"; // Using shadcn/ui Button
import Link from 'next/link';

// Simple Avatar replacement since I don't have the component definition handy,
// but I will replicate the basic structure or import if it existed.
// Since user provided imports: `import { Avatar, ... } from "@/components/ui/avatar"`,
// I should create that file if it doesn't exist or just mock it here for simplicity 
// BUT the user explicitly gave me the code to add.
// I will create the Avatar component first to be safe or inline it.
// To be safe and fast, I will create the file exactly as requested.

// However, I need to check if Avatar exists.
// I'll stick to the user's code but need to make sure the imports work.

export function Avatar({ className, children }: { className?: string; children: React.ReactNode }) {
    return <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>{children}</div>
}

export function AvatarImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} className="aspect-square h-full w-full object-cover" />
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
    return <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">{children}</div>
}

export interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    title: React.ReactNode;
    animatedTexts: string[];
    subtitle: string;
    infoBadgeText: string;
    ctaButtonText: string;
    socialProofText: string;
    avatars: {
        src: string;
        alt: string;
        fallback: string;
    }[];
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
    ({
        className,
        title,
        animatedTexts,
        subtitle,
        infoBadgeText,
        ctaButtonText,
        socialProofText,
        avatars,
        ...props
    }, ref) => {
        const [textIndex, setTextIndex] = React.useState(0);
        const [displayText, setDisplayText] = React.useState("");
        const [isDeleting, setIsDeleting] = React.useState(false);

        // Effect for the typewriter animation
        React.useEffect(() => {
            const fullText = animatedTexts[textIndex];
            const handleTyping = () => {
                if (isDeleting) {
                    // Deleting text
                    setDisplayText((prev) => prev.substring(0, prev.length - 1));
                } else {
                    // Typing text
                    setDisplayText((prev) => fullText.substring(0, prev.length + 1));
                }
            };

            const typingSpeed = isDeleting ? 75 : 150;
            const typeInterval = setInterval(handleTyping, typingSpeed);

            // Logic to switch between typing and deleting
            if (!isDeleting && displayText === fullText) {
                // Pause at the end of typing
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                // Move to the next text in the array
                setTextIndex((prev) => (prev + 1) % animatedTexts.length);
            }

            // Cleanup interval on component unmount or state change
            return () => clearInterval(typeInterval);
        }, [displayText, isDeleting, textIndex, animatedTexts]);

        return (
            <section
                className={cn(
                    "container mx-auto flex flex-col items-center justify-center text-center py-20 md:py-32",
                    className
                )}
                ref={ref}
                {...props}
            >
                <div className="max-w-4xl">
                    {/* Main Heading */}
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl font-serif">
                        {title}
                        <span className="relative mt-2 block w-fit mx-auto">
                            {/* Dashed border effect */}
                            <span className="absolute inset-0 -z-10 -m-2">
                                <span className="absolute inset-0 border-2 border-dashed border-indigo-200 rounded-2xl transform rotate-1"></span>
                            </span>
                            {/* Animated Text */}
                            <span className="text-indigo-600 min-h-[1.2em] inline-block">
                                {displayText}
                                <span className="animate-pulse">|</span>
                            </span>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-8 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="mt-10 flex flex-col items-center gap-6">
                    {/* Info Badge */}
                    <div className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-4 py-1.5 text-sm font-medium border border-indigo-100">
                        {infoBadgeText}
                    </div>

                    {/* CTA Button */}
                    <Link href="/signup">
                        <Button size="lg" className="px-10 py-6 text-lg rounded-full shadow-xl shadow-indigo-200">
                            {ctaButtonText}
                        </Button>
                    </Link>

                    {/* Social Proof */}
                    <div className="mt-4 flex items-center justify-center">
                        <div className="flex -space-x-4">
                            {avatars.map((avatar, index) => (
                                <Avatar key={index} className="border-2 border-white w-10 h-10">
                                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                                    <AvatarFallback>{avatar.fallback}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                        <p className="ml-4 text-sm font-medium text-slate-500">
                            {socialProofText}
                        </p>
                    </div>
                </div>
            </section>
        );
    }
);
HeroSection.displayName = "HeroSection";
export { HeroSection };
