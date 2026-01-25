import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Navigation, MobileNav } from './Navigation';
import { CustomCursor } from './CustomCursor';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const [clickCount, setClickCount] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Mobile/Universal Trigger: Triple click/tap
    const handleTripleClick = () => {
        setClickCount(prev => prev + 1);
        const timer = setTimeout(() => setClickCount(0), 1000);
        if (clickCount >= 2) {
            handleSecretTrigger();
            setClickCount(0);
        }
        return () => clearTimeout(timer);
    };

    // Desktop Trigger: Konami (Up Up Down Down) + Exit Intent
    useEffect(() => {
        let keys = [];
        const secret = 'ArrowUpArrowUpArrowDownArrowDown';

        const handleKeydown = (e) => {
            if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
                keys.push(e.key);
                keys = keys.slice(-4);
                if (keys.join('') === secret) {
                    handleSecretTrigger();
                    keys = [];
                }
            } else {
                keys = [];
            }
        };

        const handleMouseOut = (e) => {
            // Passive exit intent: Only trigger once
            if (e.clientY <= 0 && pathname !== '/vault' && !localStorage.getItem('vault_hint')) {
                // We could show a hint or trigger directly
                // For this request, we'll keep it as a potential trigger point
            }
        };

        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('mouseout', handleMouseOut);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, [pathname]);

    const handleSecretTrigger = () => {
        if (pathname === '/vault') return;
        setIsTransitioning(true);
        setTimeout(() => {
            setIsTransitioning(false);
            navigate('/vault');
        }, 2000); // 2s transition as requested
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div
            onClick={handleTripleClick}
            className={`min-h-screen selection:bg-secondary selection:text-white transition-all duration-1000 ${pathname === '/vault' ? 'bg-white text-secondary' : 'bg-paper text-primary'}`}
        >
            <CustomCursor />

            {/* Secret Transition Overlay */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center text-secondary font-mono p-6 border-[16px] border-white"
                        style={{ backgroundColor: 'oklch(0.8652 0.1768 90.4)' }}
                    >
                        <div className="absolute top-4 left-4 text-[10px] uppercase font-black tracking-widest bg-white text-secondary px-2">system_breach</div>
                        <div className="absolute bottom-4 right-4 text-[10px] uppercase font-black tracking-widest bg-white text-secondary px-2">v2.0.26</div>

                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="text-4xl md:text-7xl font-black italic mb-2 text-center uppercase tracking-tighter"
                        >
                            oops_found_it
                        </motion.div>
                        <p className="text-[10px] md:text-xs font-bold opacity-80 mb-8 text-center uppercase tracking-[0.3em]">
                            // redirecting to unauthorized_environment...
                        </p>

                        <div className="w-64 md:w-80 h-8 border-4 border-white p-1 relative overflow-hidden bg-white/20">
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '0%' }}
                                transition={{ duration: 1.8, ease: "linear" }}
                                className="absolute inset-y-1 left-1 right-1 bg-white"
                            />
                        </div>
                        <p className="mt-4 text-[8px] md:text-[10px] font-black opacity-40 uppercase tracking-widest">
                            probably wasn't supposed to click that...
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {pathname !== '/vault' && (
                <>
                    <motion.div
                        className="fixed top-0 left-0 right-0 h-1 bg-secondary origin-left z-[100]"
                        style={{ scaleX }}
                    />
                    <Navigation />
                    <MobileNav />
                </>
            )}

            <motion.main
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={pathname === '/vault' ? '' : 'relative pt-24 pb-12 px-6 md:px-12 lg:px-48'}
            >
                {children}
            </motion.main>

            {pathname !== '/vault' && <Footer />}

            {/* Sidebar metadata - Hidden on small screens to prevent overlap */}
            <aside className="fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 hidden lg:block [writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.5em] text-primary/30">
                {pathname === '/vault' ? 'VAULT_MODE_V4.2' : '© 2026 HITHA BADIKILLAYA'}
            </aside>
        </div>
    );
};
