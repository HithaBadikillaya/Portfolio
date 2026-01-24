import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

const experiences = [
    {
        id: 'commit-3',
        year: '2025-09',
        role: 'Core Team Member',
        company: 'SOSC',
        desc: 'Leading community initiatives and technical workshops.'
    },
    {
        id: 'commit-2',
        year: '2025-02',
        role: 'Web Development Intern',
        company: 'Zidio Development',
        desc: 'Implemented scalable frontend architectures and optimized performance.'
    },
    {
        id: 'commit-1',
        year: '2024-06',
        role: 'Full Stack Dev Intern',
        company: 'Codelab Systems',
        desc: 'Full stack implementation of client requirements using MERN stack.'
    },
];

const Experience = () => {
    return (
        <div className="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <SEO title="Experience" description="Career history." />

            <div className="mb-16">
                <span className="text-secondary font-mono text-xs tracking-widest block mb-4">
                    git log --oneline
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-primary">Changelog</h2>
            </div>

            <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12 pb-12">
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Timeline Node */}
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-paper border border-secondary" />

                        <div className="font-mono space-y-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <span className="text-yellow-500 text-xs">{exp.id}</span>
                                <span className="text-primary/40 text-xs">[{exp.year}]</span>
                                <h3 className="text-lg md:text-xl font-bold text-primary">
                                    {exp.role} <span className="text-primary/40 font-normal">@ {exp.company}</span>
                                </h3>
                            </div>
                            <p className="text-primary/60 text-sm md:text-base max-w-2xl leading-relaxed font-sans">
                                {exp.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-24 pt-12 border-t border-white/10">
                <h3 className="text-xl font-mono text-secondary mb-8">&gt; education --list</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-sm">
                    <div className="p-6 border border-white/5 bg-white/5 rounded-sm">
                        <span className="text-green-500 block mb-2">Success</span>
                        <h4 className="font-bold text-primary mb-1">B.E. Computer Science</h4>
                        <p className="text-primary/50">Sahyadri College of Engineering</p>
                    </div>
                    <div className="p-6 border border-white/5 bg-white/5 rounded-sm">
                        <span className="text-green-500 block mb-2">Success</span>
                        <h4 className="font-bold text-primary mb-1">Diploma in CS & Engineering</h4>
                        <p className="text-primary/50">Vivekananda Polytechnic</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;
