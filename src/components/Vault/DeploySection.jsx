import React from 'react';
import { Button } from 'pixel-retroui';

const DeploySection = ({ yellowAccent }) => {
    return (
        <div className="pt-16 md:pt-20 border-t-0 flex flex-col items-center pb-20">
            <div className="group relative">
                <Button
                    bg="#111"
                    shadow="rgba(0,0,0,0.6)"
                    disabled
                    className="px-12 md:px-20 py-8 md:py-10 font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/50 text-xs md:text-base opacity-80 cursor-not-allowed transition-colors border-2"
                    borderSize={2}
                    borderColor={yellowAccent}
                    style={{ borderColor: yellowAccent }}
                >
                    DEPLOY_TO_PROD
                </Button>
                <div
                    className="absolute top-full mt-6 left-1/2 -translate-x-1/2 w-72 text-center text-[10px] p-6 opacity-0 group-hover:opacity-100 transition-all font-black border-2 border-yellow-500 shadow-xl bg-black"
                    style={{ borderColor: yellowAccent }}
                >
                    <div className="mb-2 opacity-80 uppercase tracking-widest text-[9px] border-b border-white/10 pb-1 text-yellow-400">error_code: 403</div>
                    <span className="text-white">ACCESS_DENIED: anxiety.levels exceeding safe limits. try again after therapy session.</span>
                </div>
            </div>

            <footer className="w-full mt-24 pt-12 opacity-90 text-[10px] flex flex-col md:flex-row justify-between gap-6 uppercase font-black text-center md:text-left tracking-widest text-white">
                <span>managed_chaos_mode_v2.1</span>
                <span style={{ backgroundColor: yellowAccent, padding: '0 6px', color: 'black' }}>yellow_vibes_active</span>
            </footer>
        </div>
    );
};

export default DeploySection;
