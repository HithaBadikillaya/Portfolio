import { Card } from 'pixel-retroui';
import PropTypes from 'prop-types';

const DebugAccordion = ({ yellowAccent }) => {
    return (
        <div className="space-y-4 h-full">
            <p className="font-black lowercase italic tracking-widest text-xs md:text-sm text-white/60">debug_log.ERR</p>
            <Card shadowColor={yellowAccent} bg="#000" className="p-6 md:p-8 font-mono text-[10px] md:text-xs h-full border-2 text-white" style={{ borderColor: yellowAccent }}>
                <div className="space-y-3">
                    <p className="opacity-80 font-bold"># ReferenceError: sleep not found</p>
                    <p className="pl-4 border-l-2 border-white/10">at 3am_coding_session (brain/focus.js:404)</p>
                    <p className="pl-4 border-l-2 border-white/10">at deadline_panic.catch()</p>
                    <p className="pl-4 border-l-2 border-white/10">at google_every_syntax_error.loop()</p>
                    <div className="mt-6 pt-4 border-t-2 border-white/5">
                        <p className="font-black uppercase tracking-widest text-white">
                            # Status: <span className="inline-block text-yellow-400 font-black border border-yellow-400" style={{ padding: '0 6px' }}>functioning_but_confused</span>
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DebugAccordion;

DebugAccordion.propTypes = {
    yellowAccent: PropTypes.string.isRequired,
};
