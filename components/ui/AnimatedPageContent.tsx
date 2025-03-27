"use client"

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface AnimatedPageContentProps {
    children: ReactNode;
}

export function AnimatedHero() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <>
                <div className="text-4xl pb-5 md:text-7xl px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-amber-100 bg-opacity-50">
                    Create, Grow and <br /> Automate your Business
                </div>

                <p className="mt-4 text-lg font-normal text-center text-neutral-300 max-w-lg mx-auto px-4">
                    Transforming businesses into fully automated online businesses using our Business Auto+ platform.
                </p>

                <a
                    href="https://app.litemindmedia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer flex items-center justify-center border border-orange-500/20 hover:border-orange-500/40 rounded-full w-48 p-2 mx-auto my-6 text-white hover:bg-orange-500/10 transition-all duration-300"
                >
                    Get Started!
                </a>
            </>
        );
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-4xl pb-5 md:text-7xl px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-amber-100 bg-opacity-50"
            >
                Create, Grow and <br /> Automate your Business
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-4 text-lg font-normal text-center text-neutral-300 max-w-lg mx-auto px-4"
            >
                Transforming businesses into fully automated online businesses using our Business Auto+ platform.
            </motion.p>

            <motion.a
                href="https://app.litemindmedia.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(249, 115, 22, 0.1)",
                    borderColor: "rgba(249, 115, 22, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="cursor-pointer flex items-center justify-center border border-orange-500/20 hover:border-orange-500/40 rounded-full w-48 p-2 mx-auto my-6 text-white hover:bg-orange-500/10 transition-all duration-300"
            >
                Get Started!
            </motion.a>
        </>
    );
}

export function AnimatedContent({ children }: AnimatedPageContentProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <>{children}</>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {children}
        </motion.div>
    );
}

export function AnimatedSection({ children }: AnimatedPageContentProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="relative z-[1]">{children}</div>;
    }

    return (
        <motion.div
            className="relative z-[1]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            {children}
        </motion.div>
    );
}
