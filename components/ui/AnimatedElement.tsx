"use client"

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface AnimatedElementProps {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
    duration?: number;
    threshold?: number; // viewportThreshold: when element should start animating (0-1)
    once?: boolean; // whether animation should play only once
    type?: 'fade' | 'scale' | 'both'; // animation type
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({
    children,
    delay = 0,
    direction = 'up',
    className = "",
    duration = 0.8,
    threshold = 0.1,
    once = true,
    type = 'both'
}) => {
    const [isMounted, setIsMounted] = useState(false);

    // Only enable animations after the component is mounted
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Set initial and animate values based on direction
    let initialX = 0;
    let initialY = 0;

    switch (direction) {
        case 'up':
            initialY = 50;
            break;
        case 'down':
            initialY = -50;
            break;
        case 'left':
            initialX = 50;
            break;
        case 'right':
            initialX = -50;
            break;
        case 'none':
            initialX = 0;
            initialY = 0;
            break;
    }

    // Set opacity and scale based on type
    const initialOpacity = type === 'fade' || type === 'both' ? 0 : 1;
    const initialScale = type === 'scale' || type === 'both' ? 0.95 : 1;

    // If not mounted yet, render without animation
    if (!isMounted) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={{
                x: initialX,
                y: initialY,
                opacity: initialOpacity,
                scale: initialScale
            }}
            whileInView={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1
            }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1.0], // improved cubic-bezier curve
            }}
            viewport={{ once: once, margin: `-${threshold * 100}px` }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedElement;
