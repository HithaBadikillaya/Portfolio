import { Button } from 'pixel-retroui';
import PropTypes from 'prop-types';

const DeploySection = ({ yellowAccent }) => {
    return (
        <div className="pt-16 md:pt-20 border-t-0 flex flex-col items-center pb-20">
            <div className="group relative">
                <Button
                    bg="#111"
                    shadow="rgba(0,0,0,0.6)"
                    disabled
                    className="px-12 md:px-20 py-6 md:py-8 font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/60 text-xs md:text-base opacity-90 cursor-not-allowed transition-colors rounded-md flex items-center justify-center"
                    borderSize={2}
                    borderColor={yellowAccent}
                    style={{
                        border: `2px solid ${yellowAccent}`,
                        borderRadius: 8,
                        paddingTop: 18,
                        paddingBottom: 18,
                        backgroundColor: '#111'
                    }}
                >
                    <span className="pointer-events-none">DEPLOY_TO_PROD</span>
                </Button>
                <div
                    className="absolute top-full mt-6 left-1/2 -translate-x-1/2 w-72 text-center text-[10px] p-6 opacity-0 group-hover:opacity-100 transition-all font-black border-2 border-yellow-500 shadow-xl bg-black"
                    style={{ borderColor: yellowAccent }}
                >
                    <div className="mb-2 opacity-80 uppercase tracking-widest text-[9px] border-b border-white/10 pb-1 text-yellow-400">error_code: 403</div>
                    <span className="text-white">ACCESS_DENIED: still haunted by that incident (May 15, 2024). Retry when ready.</span>
                </div>
            </div>

            <footer className="w-full mt-24 pt-12 opacity-90 text-[10px] flex flex-col md:flex-row justify-between gap-6 uppercase font-black text-center md:text-left tracking-widest text-white">
                <span>managed_chaos_mode_v2.1</span>
                <span style={{ backgroundColor: yellowAccent, padding: '0 6px', color: 'black' }}>imagine_i_said_something_cool</span>
            </footer>
        </div>
    );
};

export default DeploySection;

DeploySection.propTypes = {
    yellowAccent: PropTypes.string.isRequired,
};
