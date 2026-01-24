import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Navigation Component (Magazine Style)
 * 
 * Why: Vertical navigation often feels more "editorial" and breaks the standard web layout.
 */
export const Navigation = () => {
    const links = [
        { path: '/', label: 'Index' },
        { path: '/about', label: 'About' },
        { path: '/projects', label: 'Works' },
        { path: '/experience', label: 'Career' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8">
            {links.map((link, index) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                        `group relative flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] transition-all duration-300 ${isActive ? 'text-secondary' : 'text-primary/40 hover:text-primary'
                        }`
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
        </nav>
    );
};

export const MobileNav = () => {
    // Simple mobile nav implementation
    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 lg:hidden bg-paper/80 backdrop-blur-md border border-secondary/20 px-6 py-4 rounded-full z-50 flex gap-6">
            <NavLink to="/" className={({ isActive }) => `text-[10px] uppercase tracking-widest font-bold ${isActive ? 'text-secondary' : 'text-primary'}`}>Inx.</NavLink>
            <NavLink to="/projects" className={({ isActive }) => `text-[10px] uppercase tracking-widest font-bold ${isActive ? 'text-secondary' : 'text-primary'}`}>Wrk.</NavLink>
            <NavLink to="/about" className={({ isActive }) => `text-[10px] uppercase tracking-widest font-bold ${isActive ? 'text-secondary' : 'text-primary'}`}>Abt.</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `text-[10px] uppercase tracking-widest font-bold ${isActive ? 'text-secondary' : 'text-primary'}`}>Con.</NavLink>
        </nav>
    )
}
