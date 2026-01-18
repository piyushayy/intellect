"use client";

import { motion } from "framer-motion";

export const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 1, y: 0 }} // Changed to visible by default for debugging
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
        >
            {children}
        </motion.div>
    );
}

export function Counter({ from, to }: { from: number, to: number }) {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            {/* We can use a simpler approach or a dedicated hook for counting up */}
            {/* For now keeping it simple as a placeholder for a more complex hook if needed */}
            {to}
        </motion.span>
    )
}
