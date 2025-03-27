"use client"

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpotlightProps {
    gradientFirst?: string;
    gradientSecond?: string;
    gradientThird?: string;
}

export function Spotlight({
    gradientFirst = "radial-gradient(600px circle at 50% 30%, hsla(0, 0%, 100%, .01), transparent 80%)",
    gradientSecond = "radial-gradient(800px circle at 50% 50%, hsla(0, 0%, 100%, .01), transparent 80%)",
    gradientThird = "radial-gradient(1000px circle at 30% 60%, hsla(0, 0%, 100%, .01), transparent 80%)",
}: SpotlightProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Initial animation even without hover
        const interval = setInterval(() => {
            if (!isHovering) {
                const randomX = Math.random() * 100;
                const randomY = Math.random() * 100;
                setMousePosition({ x: randomX, y: randomY });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovering]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setMousePosition({ x, y });
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    if (!isMounted) {
        // Return a static version for server-side rendering
        return (
            <div className="fixed inset-0 w-screen h-screen z-0 overflow-hidden">
                <div
                    className="w-full h-full opacity-60"
                    style={{
                        background: gradientFirst,
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
                <div
                    className="w-full h-full opacity-40"
                    style={{
                        background: gradientSecond,
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
                <div
                    className="w-full h-full opacity-30"
                    style={{
                        background: gradientThird,
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-screen h-screen z-0 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="w-full h-full opacity-60"
                style={{
                    background: gradientFirst,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
                animate={{
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
                transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 30,
                    mass: 1,
                }}
            />
            <motion.div
                className="w-full h-full opacity-40"
                style={{
                    background: gradientSecond,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
                animate={{
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
                transition={{
                    type: "spring",
                    stiffness: 30,
                    damping: 20,
                    mass: 1.2,
                    delay: 0.1,
                }}
            />
            <motion.div
                className="w-full h-full opacity-30"
                style={{
                    background: gradientThird,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
                animate={{
                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
                transition={{
                    type: "spring",
                    stiffness: 20,
                    damping: 15,
                    mass: 1.5,
                    delay: 0.2,
                }}
            />
        </div>
    );
}
