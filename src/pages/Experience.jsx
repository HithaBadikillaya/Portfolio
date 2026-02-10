import { motion } from 'framer-motion';

const experiences = [
    {
        id: 'commit-3',
        year: '2025-09',
        role: 'Core Team Member',
        company: 'SOSC',
        desc: 'Contributing to community-driven and open-source projects using structured Git workflows and peer collaboration.'    },
    {
        id: 'commit-2',
        year: '2025-02',
        role: 'Web Development Intern',
        company: 'Zidio Development',
        desc: 'Developed a real-time meeting platform with a distributed intern team. Implemented low-latency features using Socket.io and optimized frontend and backend workflows.'
    },
    {
        id: 'commit-1',
        year: '2024-06',
        role: 'Full Stack Dev Intern',
        company: 'Codelab Systems',
        desc: 'Built a production-grade web app with React.js and Node.js. Integrated backend services with MongoDB and ensured responsive UI across devices.'
    },
];


const Experience = () => {
    return (
        <div className="min-h-screen py-6 px-6 md:px-12 max-w-7xl mx-auto">
            <>
                <title>Experience | Hitha </title>
                <meta name="description" content="Career history." />
                <meta property="og:title" content="Experience | Hitha Portfolio" />
                <meta property="og:description" content="Career history." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Experience | Hitha Portfolio" />
                <meta name="twitter:description" content="Career history." />
            </>

            <div className="mb-12">
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

                <div className="relative pl-8 md:pl-12 opacity-50">
                    <div className="absolute -left-[4px] top-2 w-2 h-2 rounded-full bg-white/20" />
                    <p className="font-mono text-xs text-primary/40">initial commit (Hello World)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pt-12 border-t border-white/10">
                {/* Education */}
                <div>
                    <h3 className="text-xl font-mono text-secondary mb-8">&gt; education --list</h3>
                    <div className="space-y-4 font-mono text-sm">
                        <div className="p-6 border border-white/5 bg-white/5 rounded-sm">
                            <span className="text-green-500 block mb-2 text-xs">status: ongoing</span>
                            <h4 className="font-bold text-primary mb-1">B.E. Computer Science</h4>
                            <p className="text-primary/50 text-xs">Sahyadri College of Engineering And Management</p>
                        </div>
                        <div className="p-6 border border-white/5 bg-white/5 rounded-sm">
                            <span className="text-green-500 block mb-2 text-xs">status: completed</span>
                            <h4 className="font-bold text-primary mb-1">Diploma in CS</h4>
                            <p className="text-primary/50 text-xs">Vivekananda Polytechnic Puttur</p>
                        </div>
                    </div>
                </div>

               
                <div>
                    <h3 className="text-xl font-mono text-secondary mb-8">&gt; npm list --depth=0</h3>
                    <div className="p-6 border border-white/5 bg-white/5 rounded-sm font-mono text-xs md:text-sm space-y-2 text-primary/80">
                        <p>├── <span className="text-secondary">frontend@latest</span></p>
                        <p>│   ├── React.js</p>
                        <p>│   ├── Next.js</p>
                        <p>│   └── Tailwind</p>
                        <p>├── <span className="text-secondary">backend@stable</span></p>
                        <p>│   ├── Node.js</p>
                        <p>│   ├── MongoDB</p>
                        <p>│   └── MySQL</p>
                        <p>└── <span className="text-secondary">tools@dev</span></p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;├── Git</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;└── Docker</p>
                        <div className="pt-4 text-xs text-primary/40 italic">
                            found 0 vulnerabilities (hopefully)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;
