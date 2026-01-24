import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * Custom Cursor Component
 * 
 * Why: Adds a premium, interactive feel common in high-end editorial sites.
 * Gamification: The cursor expands and changes color when interacting with the UI.
 */
export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        // Detect if the device has a mouse/fine pointer
        const hasMouse = window.matchMedia('(pointer: fine)').matches;
        if (!hasMouse) return;

        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleHoverStart = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.closest('a')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleHoverStart);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleHoverStart);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            style={{
                x: mouseX,
                y: mouseY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10000] rounded-full border-2 border-secondary flex items-center justify-center bg-secondary/5 shadow-[0_0_15px_var(--color-secondary)]"
            animate={{
                scale: isHovering ? 1.5 : 1,
                borderColor: isHovering ? 'var(--color-primary)' : 'var(--color-secondary)',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
            <div className="w-1 h-1 bg-secondary rounded-full" />
        </motion.div>
    );
};
