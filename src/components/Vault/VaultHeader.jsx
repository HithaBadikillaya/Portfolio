import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const VaultHeader = ({ yellowAccent }) => {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-8 md:pb-12 border-b-8 text-center"
            style={{ borderColor: yellowAccent }}
        >
            <h1
                className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter mb-4 uppercase leading-[0.9] break-words text-white"
            >
                yayy you found it!
            </h1>
            <p className="text-white/70 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] leading-relaxed font-bold max-w-2xl mx-auto">
                The earlier pages were the “trying to look put-together” version of me. This is sweatpants mode - chaotic thoughts, loose ideas, and zero shame. Enjoy the mess.
            </p>
        </motion.header>
    );
};

export default VaultHeader;

VaultHeader.propTypes = {
    yellowAccent: PropTypes.string.isRequired,
};
