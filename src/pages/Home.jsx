import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

const Home = () => {
    const [uptime, setUptime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setUptime(u => u + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    const formatUptime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    return (
        <div className="min-h-screen py-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
            <SEO
                title="Index"
                description="Hitha Badikillaya - Full Stack Engineering."
            />

            {/* Header: Title */}
            <header className="mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-xs md:text-sm font-mono text-secondary mb-4 block tracking-widest">
                        &gt; WHOAMI
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary tracking-tight leading-none">
                        Hitha Badikillaya
                    </h1>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                {/* Left: 2-Column Text (About Context) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-sm md:prose-base text-primary/80 font-sans leading-relaxed md:columns-2 gap-8 space-y-4 md:space-y-0 text-justify"
                >
                    <p>
                        I am a multidisciplinary builder focused on creating digital interfaces that resonate.
                        My work oscillates between the precision of engineering and the fluidity of experience design.
                        With a background in computer science, I believe the most powerful products are those that
                        balance technical excellence with emotional impact.
                    </p>
                    <p>
                        I specialize in building scalable web applications using the modern javascript ecosystem.
                        Beyond code, I am deeply involved in fostering technical communities and contributing to open source.
                        Currently based in India, working remotely with teams across the globe.
                    </p>
                    <p className="font-mono text-xs text-secondary mt-4">
                        &gt; "There's no place like 127.0.0.1"
                    </p>
                </motion.div>

                {/* Right: Terminal */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full"
                >
                    <div className="w-full bg-black/40 backdrop-blur-sm border border-secondary/20 rounded-sm shadow-xl overflow-hidden">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                            <div className="flex gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-primary/40 font-mono">dev_terminal</span>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-6 font-mono text-xs md:text-sm space-y-6">
                            <div className="space-y-2">
                                <p className="text-secondary">$ current_stack --verify</p>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-1 pl-4 text-primary/80">
                                    <span className="text-primary/60">React.js</span>
                                    <span className="text-green-400">v19.0.0</span>
                                    <span className="text-primary/60">Next.js</span>
                                    <span className="text-green-400">Stable</span>
                                    <span className="text-primary/60">Node.js</span>
                                    <span className="text-green-400">LTS</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-secondary">$ check_uptime</p>
                                <p className="pl-4 text-primary/80">
                                    &gt; Session: <span className="text-green-400">{formatUptime(uptime)}</span><br />
                                    &gt; Coffee_Level: <span className="text-yellow-500">404 Not Found</span>
                                </p>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <p className="animate-pulse text-secondary">_ awaiting_input</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
