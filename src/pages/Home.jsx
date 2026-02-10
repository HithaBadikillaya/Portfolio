import{ useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
        <div className="min-h-screen py-6 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center bg-paper text-primary">
            <>
                <title>Index | Hitha </title>
                <meta name="description" content="Hitha Badikillaya - Software Dev." />
                <meta property="og:title" content="Index | Hitha Portfolio" />
                <meta property="og:description" content="Hitha Badikillaya - Software Dev." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Index | Hitha Portfolio" />
                <meta name="twitter:description" content="Hitha Badikillaya - Full Stack Engineering." />
            </>

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

                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-sm md:prose-base text-primary font-sans leading-relaxed space-y-6"
                >
                    <div>
                        <p>
                            Hey there! good to see you, while you are here, might as well get to know me. I majorly deal with web apps, AI experiments, and small projects that catch my curiosity. I focus on building interfaces that work smoothly and feel right to use, without making anyone pull their hair out. If you&apos;re paying attention, there&apos;s a secret vault on the site for the curious.
                        </p><br/>
                        <p>
                            Im also active in open-source and developer communities - contributing code, improving docs, and learning together. If you&apos;d like to connect, my contact links are below or use the contact page to send me an email. Enjoy exploring the site.
                        </p>
                    </div>

                    <p className="font-mono text-xs text-secondary mt-4">
                        &gt; ps the code for the vault is hidden in plain sight. good luck and let me know if you find it!
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
                                <div className="grid grid-cols-2 gap-x-8 gap-y-1 pl-4 text-primary">
                                    <span className="text-primary">React.js</span>
                                    <span className="text-green-400">does not break (usually)</span>
                                    <span className="text-primary">Next.js</span>
                                    <span className="text-green-400">like butter on toast</span>
                                    <span className="text-primary">Node.js</span>
                                    <span className="text-green-400">does its thing… somehow</span>

                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-secondary">$ check_uptime</p>
                                <p className="pl-4 text-primary">
                                    &gt; Session: <span className="text-green-400">{formatUptime(uptime)}</span><br />
                                    &gt; Sanity: <span className="text-yellow-500">404 Not Found</span>
                                </p>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <p className="animate-pulse text-secondary">_vault = try tapping a few keys in the right order.... </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
