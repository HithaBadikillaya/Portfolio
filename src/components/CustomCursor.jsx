import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const mouseX = useSpring(0, { stiffness: 1000, damping: 48 });
    const mouseY = useSpring(0, { stiffness: 1000, damping: 48 });

    useEffect(() => {
        const handleMouseMove = (e) => {
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

        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleHoverStart);
        window.addEventListener('resize', checkMobile);
        checkMobile();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleHoverStart);
            window.removeEventListener('resize', checkMobile);
        };
    }, [mouseX, mouseY]);

    if (isMobile) return null;

    return (
        <motion.div
            style={{
                x: mouseX,
                y: mouseY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] rounded-full border border-secondary/50 mix-blend-difference flex items-center justify-center"
            animate={{
                scale: isHovering ? 1.8 : 1.2,
                backgroundColor: isHovering ? 'var(--color-secondary)' : 'transparent',
            }}
            transition={{ type: 'spring', stiffness: 900, damping: 45, mass: 0.5 }}
        >
            <div className="w-2 h-2 bg-secondary rounded-full" />
        </motion.div>
    );
};
