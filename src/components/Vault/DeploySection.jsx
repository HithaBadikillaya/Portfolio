import React from 'react';
import { Button } from 'pixel-retroui';

const DeploySection = ({ yellowAccent }) => {
    return (
        <div className="pt-16 md:pt-20 border-t-8 border-primary/5 flex flex-col items-center pb-20">
            <div className="group relative">
                <Button
                    bg="#f0f0f0"
                    shadow="rgba(0,0,0,0.1)"
                    disabled
                    className="px-12 md:px-20 py-8 md:py-10 font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-primary/20 text-xs md:text-base opacity-50 cursor-not-allowed hover:bg-[#ebebeb] transition-colors"
                    borderSize={2}
                    borderColor="var(--color-primary)"
                >
                    DEPLOY_TO_PROD
                </Button>
                <div
                    className="absolute top-full mt-6 left-1/2 -translate-x-1/2 w-72 text-center text-[10px] text-black p-6 opacity-0 group-hover:opacity-100 transition-all font-black border-4 border-black shadow-xl"
                    style={{ backgroundColor: yellowAccent }}
                >
                    <div className="mb-2 opacity-50 uppercase tracking-widest text-[9px] border-b border-black/20 pb-1">error_code: 403</div>
                    ACCESS_DENIED: anxiety.levels exceeding safe limits. try again after therapy session.
                </div>
            </div>

            <footer className="w-full mt-24 pt-12 border-t border-black/5 opacity-40 text-[10px] flex flex-col md:flex-row justify-between gap-6 uppercase font-black text-center md:text-left tracking-widest text-black">
                <span>managed_chaos_mode_v2.1</span>
                <span style={{ backgroundColor: yellowAccent, padding: '0 4px', color: 'black' }}>yellow_vibes_active</span>
            </footer>
        </div>
    );
};

export default DeploySection;
