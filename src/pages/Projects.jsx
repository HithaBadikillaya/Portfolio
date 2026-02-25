import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import projects from '../data/projects.json';
import communityProjects from '../data/communityProjects.json';
import fallbackCommitsData from '../data/fallbackCommits.json';

const Projects = () => {
    const [commitLog, setCommitLog] = useState(fallbackCommitsData);

    useEffect(() => {
        let mounted = true;

        const timeAgo = (iso) => {
            const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
            if (diff < 60) return `${diff}s ago`;
            if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
            if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
            return `${Math.floor(diff / 86400)}d ago`;
        };

        fetch('https://api.github.com/search/commits?q=author:HithaBadikillaya&sort=committer-date&order=desc')
            .then((res) => {
                if (!res.ok) throw new Error('GitHub API error');
                return res.json();
            })
            .then((data) => {
                if (!mounted || !data || !Array.isArray(data.items)) return;

                const commits = data.items.map((item) => ({
                    hash: (item.sha || '').slice(0, 7),
                    msg: `[${item.repository?.name || 'unknown'}] ${item.commit?.message || 'commit'}`,
                    time: timeAgo(item.commit?.author?.date),
                }));

                if (commits.length > 0) setCommitLog(commits.slice(0, 8));
            })
            .catch(() => {
                // on error, keep fallback commits
            });

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="min-h-screen py-6 px-6 md:px-12 max-w-7xl mx-auto">
            <>
                <title>Projects | Hitha </title>
                <meta name="description" content="Directory of works." />
                <meta property="og:title" content="Projects | Hitha Portfolio" />
                <meta property="og:description" content="Directory of works." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Projects | Hitha Portfolio" />
                <meta name="twitter:description" content="Directory of works." />
            </>

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
            <div className="border border-white/10 rounded-sm overflow-hidden bg-white/5 mb-24">
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
                            href={project.link}
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
                                <div className="col-span-12 md:col-span-4 text-primary/60 text-xs md:text-sm break-words whitespace-normal">
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

            {/* Community Projects Section - Visual Version */}
            <div className="mb-12">
                <span className="text-secondary font-mono text-xs tracking-widest block mb-4 uppercase">
                    &gt; my contributions
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-primary">Community Projects</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-24">
                {communityProjects.map((project, idx) => (
                    <motion.a
                        key={project.id}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -8 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group block"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[16/10] overflow-hidden border border-white/10 rounded-sm bg-white/5 mb-6 flex items-center justify-center p-4">
                            <img
                                src={project.image}
                                alt={project.title}
                                className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${project.image.endsWith('.svg') ? 'object-contain' : 'object-cover'
                                    }`}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';
                                }}
                            />

                            {/* Status Badge */}
                            <div className="absolute top-4 left-4 z-20">
                                <span className={`px-2 py-1 text-[10px] font-mono tracking-tighter uppercase backdrop-blur-md border ${project.year === 'ongoing'
                                    ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-500'
                                    : 'bg-green-500/20 border-green-500/30 text-green-500'
                                    }`}>
                                    {project.year === 'ongoing' ? 'In Progress' : project.year}
                                </span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="space-y-3 px-1">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl md:text-2xl font-serif text-primary group-hover:text-secondary transition-colors truncate pr-4">
                                    {project.title}
                                </h3>
                                <span className="text-secondary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 shrink-0">
                                    →
                                </span>
                            </div>
                            <p className="text-sm text-primary/60 font-mono leading-relaxed line-clamp-2 min-h-[2.5rem]">
                                {project.description}
                            </p>
                            <p className="text-sm text-primary font-mono leading-relaxed line-clamp-2 min-h-[2.5rem]">
                                -&gt; {project.role}
                            </p>
                            <div className="pt-2">
                                <span className="text-[10px] text-secondary/50 font-mono uppercase tracking-widest border-b border-secondary/20 pb-1 group-hover:border-secondary transition-colors">
                                    View Project
                                </span>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>

            {/* Extra Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono">

                {/* Recent Activity Log */}
                <div className="space-y-6">
                    <h3 className="text-xl text-secondary">&gt; recent_activity.log</h3>
                    <div className="border border-white/10 bg-black/40 p-6 rounded-sm space-y-4 text-xs">
                        {commitLog.map((log, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-2 md:gap-4 text-primary/70 border-b border-white/5 last:border-0 pb-3 md:pb-2 last:pb-0">
                                <div className="flex justify-between md:contents">
                                    <span className="text-yellow-500 w-16 opacity-70 font-bold">{log.hash}</span>
                                    <span className="text-primary/30 text-[10px] md:hidden">{log.time}</span>
                                </div>
                                <span className="flex-1 break-words whitespace-normal text-sm md:text-xs">&quot;{log.msg}&quot;</span>
                                <span className="text-primary/30 text-right hidden md:block">{log.time}</span>
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
                    &gt;  Feeling adventurous? might want to look closely at the footer
                </p>
            </div>


            <div className="mt-12 border border-white/10 rounded-sm overflow-hidden bg-white/5 p-8 text-center">
                <h3 className="text-xl font-serif text-primary mb-4">Want more chaos?</h3>
                <p className="text-primary/60 mb-6">If you liked poking things, I break even more projects on my GitHub.</p>
                <a href={`https://github.com/HithaBadikillaya`} target="_blank" rel="noopener noreferrer" className="inline-block text-xs uppercase tracking-widest font-bold text-secondary hover:text-primary border border-secondary/30 px-6 py-3 transition-colors">
                    Visit my GitHub
                </a>
            </div>
        </div>
    );
};

export default Projects;
