import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

const projects = [
    {
        id: 1,
        title: 'Belle Allure',
        category: 'e-commerce',
        year: '2025',
        tech: ['Recoil', 'React', 'Node'],
        description: 'High-performance e-commerce engine with real-time inventory.'
    },
    {
        id: 2,
        title: 'CommandBrainCLI',
        category: 'cli-tool',
        year: '2025',
        tech: ['Rust', 'Clap', 'Tokio'],
        description: 'Terminal-based productivity suite for developers.'
    },
    {
        id: 3,
        title: 'D.A.S.H',
        category: 'docs',
        year: 'ongoing',
        tech: ['Next.js', 'MDX', 'Tailwind'],
        description: 'Developer Analysis & System Hub - Technical documentation platform.'
    },
];

const Projects = () => {
    return (
        <div className="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <SEO title="Projects" description="Directory of works." />

            <div className="mb-16">
                <span className="text-secondary font-mono text-xs tracking-widest block mb-4">
                    ~/projects
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-primary">Repositories</h2>
            </div>

            <div className="border border-white/10 rounded-sm overflow-hidden bg-white/5">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-secondary">
                    <div className="col-span-12 md:col-span-4">Name</div>
                    <div className="col-span-6 md:col-span-4">Description</div>
                    <div className="col-span-3 md:col-span-2">Stack</div>
                    <div className="col-span-3 md:col-span-2 text-right">Year</div>
                </div>

                {/* Table Body */}
                <div className="font-mono text-sm">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
                        >
                            {/* Name */}
                            <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                                <span className="text-secondary opacity-50 text-xs">d--r-</span>
                                <span className="font-bold text-primary group-hover:text-secondary transition-colors">
                                    {project.title}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="col-span-6 md:col-span-4 text-primary/60 text-xs md:text-sm truncate">
                                {project.description}
                            </div>

                            {/* Stack */}
                            <div className="col-span-3 md:col-span-2 text-xs text-primary/40">
                                {project.tech.join(', ')}
                            </div>

                            {/* Year */}
                            <div className="col-span-3 md:col-span-2 text-right text-primary/40">
                                {project.year}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Table Footer */}
                <div className="p-2 bg-white/5 text-[10px] font-mono text-center text-primary/30">
                    {projects.length} directories listed.
                </div>
            </div>
        </div>
    );
};

export default Projects;
