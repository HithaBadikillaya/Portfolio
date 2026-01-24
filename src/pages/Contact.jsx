import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/SEO';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="min-h-screen py-24 px-6 md:px-12 max-w-5xl mx-auto flex flex-col justify-center">
            <SEO title="Contact" description="Initialize connection." />

            <div className="mb-12">
                <span className="text-secondary font-mono text-xs tracking-widest block mb-4">
                    ssh user@hitha.dev
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-primary">Initialize Connection</h2>
            </div>

            <div className="w-full bg-black border border-white/20 rounded-md shadow-2xl overflow-hidden font-mono">
                {/* Terminal Window Header */}
                <div className="bg-white/10 px-4 py-2 flex items-center gap-2 border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="flex-1 text-center text-xs text-primary/40">bash — 80x24</div>
                </div>

                {/* Form Content */}
                <div className="p-6 md:p-12 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6 max-w-2xl"
                            >
                                <div className="space-y-2">
                                    <label className="block text-secondary text-xs">root@hitha:~/contact# enter_identity</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">&gt;</span>
                                        <input
                                            required
                                            className="bg-transparent border-none focus:ring-0 text-primary w-full outline-none caret-secondary placeholder-white/20"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-secondary text-xs">root@hitha:~/contact# enter_email</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-500">&gt;</span>
                                        <input
                                            type="email"
                                            required
                                            className="bg-transparent border-none focus:ring-0 text-primary w-full outline-none caret-secondary placeholder-white/20"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-secondary text-xs">root@hitha:~/contact# define_payload</label>
                                    <div className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">&gt;</span>
                                        <textarea
                                            required
                                            rows={4}
                                            className="bg-transparent border-none focus:ring-0 text-primary w-full outline-none caret-secondary placeholder-white/20 resize-none"
                                            placeholder="Write your message here..."
                                        />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        className="text-primary hover:text-black bg-white/5 hover:bg-secondary border border-secondary/50 px-6 py-2 transition-all text-xs uppercase tracking-widest"
                                    >
                                        Execute_Send
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col justify-center items-center text-center space-y-4 pt-12"
                            >
                                <div className="text-green-500 text-6xl mb-4">✓</div>
                                <h3 className="text-2xl text-primary">Transmission Successful</h3>
                                <p className="text-primary/60 text-sm">Target host acknowledged receipt. Connection closed.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-xs text-secondary underline hover:text-primary transition-colors"
                                >
                                    ./open_new_connection.sh
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-12 text-center text-primary/30 font-mono text-xs">
                <p>Designed for secure communication channels.</p>
                <p>hithabadikillaya@gmail.com</p>
            </div>
        </div>
    );
};

export default Contact;
