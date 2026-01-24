import React from 'react';
import { motion } from 'framer-motion';

const VaultHeader = ({ yellowAccent }) => {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-8 md:pb-12 border-b-8 border-primary text-center"
            style={{ borderColor: yellowAccent }}
        >
            <h1
                className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter mb-4 uppercase leading-[0.9] break-words text-primary"
            >
                welcome_to_my_secret_corner
            </h1>
            <p className="text-primary/60 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] leading-relaxed font-bold max-w-2xl mx-auto">
                you found the easter egg!! this is where i keep all the unhinged developer thoughts <br className="hidden md:block" />
                warning: professionalism levels critically low
            </p>
        </motion.header>
    );
};

export default VaultHeader;
