import { motion } from "framer-motion";
import PropTypes from "prop-types";

const FadeInWrapper = ({ children, direction = "up", delay = 0, duration = 0.75 }) => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: direction === "up" ? 30 : 0 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", delay, duration } },
  };

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

FadeInWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
};

export default FadeInWrapper;
