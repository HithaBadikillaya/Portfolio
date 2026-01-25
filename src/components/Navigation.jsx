import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Navigation = () => {
    const navRef = useRef(null);
    const links = [
        { path: '/', label: 'Index' },
        { path: '/projects', label: 'Works' },
        { path: '/experience', label: 'Career' },
        { path: '/contact', label: 'Contact' },
    ];

    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        const handleScroll = () => {
            const mainContent = document.getElementById('main-content');
            if (!mainContent) return;

            const mainRect = mainContent.getBoundingClientRect();
            const navHeight = nav.offsetHeight;
            const viewportHeight = window.innerHeight;

            if (mainRect.bottom <= viewportHeight / 2) {
                nav.style.position = 'absolute';
                nav.style.top = `${mainContent.offsetHeight - navHeight - viewportHeight / 2}px`;
            } else {
                nav.style.position = 'fixed';
                nav.style.top = '50%';
                nav.style.transform = 'translateY(-50%)';
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <motion.nav
            ref={navRef}
            className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8"
        >
            {links.map((link, index) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                        `group relative flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] transition-colors duration-500 ${isActive ? 'text-secondary' : 'text-primary/60 hover:text-primary'}`
                    }
                >
                    <motion.span
                        className="w-12 h-px bg-current origin-left"
                        initial={{ scaleX: 0.2 }}
                        whileHover={{ scaleX: 1 }}
                    />
                    {link.label}
                    <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        0{index + 1}
                    </span>
                </NavLink>
            ))}
        </motion.nav>
    );
};

export const MobileNav = () => {
    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 lg:hidden bg-paper/80 backdrop-blur-md border border-secondary/20 px-6 py-4 rounded-full z-50 flex gap-6">
            {['/', '/projects', '/experience', '/contact'].map((path, index) => (
                <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                        `text-[10px] uppercase tracking-widest font-bold ${isActive ? 'text-secondary' : 'text-primary'}`
                    }
                >
                    {['Inx.', 'Wrk.', 'Exp.', 'Con.'][index]}
                </NavLink>
            ))}
        </nav>
    );
};
