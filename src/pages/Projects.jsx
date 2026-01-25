import React, { useState, useEffect } from 'react';
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

const commitLog = [
    { hash: 'a1b2c3d', msg: 'fixed typo in README (again)', time: '2h ago' },
    { hash: 'e5f6g7h', msg: 'removed console.log("here")', time: '5h ago' },
    { hash: 'i8j9k0l', msg: 'refactored messy code into smaller messy code', time: '1d ago' },
    { hash: 'm1n2o3p', msg: 'wip: attempting to center a div', time: '2d ago' },
];

const Projects = () => {
    // Fake hydration for hydration error prevention
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const GH_USER = 'HithaBadikillaya';

    const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return (
        <div className="min-h-screen py-16 px-6 md:px-12 max-w-7xl mx-auto">
            <SEO title="Projects" description="Directory of works." />

            {/* Header Area */}
            <div className="mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6">
                <div>
                    <span className="text-secondary font-mono text-xs tracking-widest block mb-4">
                        ~/projects
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif text-primary">Repositories</h2>
                </div>

                {/* Visual Stats */}
                <div className="flex gap-4 font-mono text-xs text-primary/60">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <span>JavaScript 60%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span>TypeScript 30%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <span>Coffee 10%</span>
                    </div>
                </div>
            </div>

            {/* Main Projects Table */}
            <div className="border border-white/10 rounded-sm overflow-hidden bg-white/5 mb-16">
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
                        <a
                            key={project.id}
                            href={`https://github.com/${GH_USER}/${slugify(project.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group col-span-12"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
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

                                {/* Open indicator */}
                                <div className="col-span-12 md:col-span-12 text-right hidden md:block">
                                    <span className="text-[10px] text-primary/40 group-hover:text-secondary transition-colors">Open on GitHub ↗</span>
                                </div>
                            </motion.div>
                        </a>
                    ))}
                </div>

                {/* Table Footer */}
                <div className="p-2 bg-white/5 text-[10px] font-mono text-center text-primary/30">
                    {projects.length} directories listed. Click any row to open the repository on GitHub.
                </div>
            </div>

            {/* Extra Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono">

                {/* Recent Activity Log */}
                <div className="space-y-6">
                    <h3 className="text-xl text-secondary">&gt; recent_activity.log</h3>
                    <div className="border border-white/10 bg-black/40 p-6 rounded-sm space-y-4 text-xs">
                        {commitLog.map((log, i) => (
                            <div key={i} className="flex gap-4 text-primary/70 border-b border-white/5 last:border-0 pb-2 last:pb-0">
                                <span className="text-yellow-500 w-16 opacity-70">{log.hash}</span>
                                <span className="flex-1 truncate">"{log.msg}"</span>
                                <span className="text-primary/30 text-right">{log.time}</span>
                            </div>
                        ))}
                        <div className="pt-2 text-primary/20 italic text-[10px] text-center">
                            * actual commit messages may contain more profanity
                        </div>
                    </div>
                </div>

                {/* System Metrics */}
                <div className="space-y-6">
                    <h3 className="text-xl text-secondary">&gt; system_resources</h3>
                    <div className="border border-white/10 bg-black/40 p-6 rounded-sm space-y-6 text-xs text-primary/80">
                        {/* CPU */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>CPU Usage (Brain)</span>
                                <span className="text-red-400">98%</span>
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-red-400 w-[98%] animate-pulse" />
                            </div>
                            <div className="text-[10px] text-primary/30">Process: overthinking_everything.exe</div>
                        </div>

                        {/* Memory */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Memory (RAM)</span>
                                <span className="text-yellow-400">Stack Overflow</span>
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400 w-[75%]" />
                            </div>
                            <div className="text-[10px] text-primary/30">Chrome Tabs Open: ∞</div>
                        </div>

                        {/* Deployment */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Deployment Status</span>
                                <span className="text-green-400">Stable-ish</span>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className={`h-2 flex-1 rounded-sm ${Math.random() > 0.8 ? 'bg-red-500/50' : 'bg-green-500/50'}`} />
                                ))}
                            </div>
                            <div className="text-[10px] text-primary/30">Last crash: 5 mins ago (fixed it tho)</div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-16 text-center">
                <p className="text-xs font-mono text-secondary opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                    &gt; sudo make me a sandwich
                </p>
            </div>

            {/* Final Themed GitHub Section */}
            <div className="mt-12 border border-white/10 rounded-sm overflow-hidden bg-white/5 p-8 text-center">
                <h3 className="text-xl font-serif text-primary mb-4">Want more chaos?</h3>
                <p className="text-primary/60 mb-6">If you liked poking things, I break even more projects on my GitHub.</p>
                <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noopener noreferrer" className="inline-block text-xs uppercase tracking-widest font-bold text-secondary hover:text-primary border border-secondary/30 px-6 py-3 transition-colors">
                    Visit my GitHub — it's a museum of workarounds
                </a>
            </div>
        </div>
    );
};

export default Projects;
