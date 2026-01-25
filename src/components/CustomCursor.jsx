import  { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
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

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleHoverStart);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleHoverStart);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                x: mouseX,
                y: mouseY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] rounded-full border border-secondary mix-blend-difference flex items-center justify-center"
            animate={{
                scale: isHovering ? 1.6 : 1,
                backgroundColor: isHovering ? 'var(--color-secondary)' : 'transparent',
            }}
            transition={{ type: 'spring', stiffness: 900, damping: 45, mass: 0.5 }}
        >
            <div className="w-1 h-1 bg-secondary rounded-full" />
        </motion.div>
    );
};
