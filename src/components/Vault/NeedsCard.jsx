import React from 'react';
import { Card } from 'pixel-retroui';

const NeedsCard = ({ yellowAccent }) => {
    return (
        <div className="space-y-4 h-full">
            <p className="font-black lowercase italic tracking-widest text-xs md:text-sm text-white/60">daily_needs.MD</p>
            <Card shadowColor={yellowAccent} bg="#000" className="p-6 md:p-8 h-full border-2 text-white" style={{ borderColor: yellowAccent }}>
                <div className="space-y-6">
                    <p
                        className="font-black uppercase border-b-4 inline-block text-sm md:text-base pb-1 tracking-tighter text-white"
                        style={{ borderBottomColor: yellowAccent }}
                    >
                        Requirements:
                    </p>
                    <ul className="space-y-4 font-bold text-xs md:text-sm">
                        <li className="flex justify-between gap-4 items-center border-b border-white/5 pb-2">
                            <span className="text-white/70 tracking-widest">COFFEE</span>
                            <span className="text-yellow-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest border border-yellow-400" style={{ backgroundColor: 'transparent' }}>MANDATORY</span>
                        </li>
                        <li className="flex justify-between gap-4 items-center border-b border-white/5 pb-2">
                            <span className="text-white/70 tracking-widest">SPOTIFY</span>
                            <span className="italic lowercase text-white/85">lofi_beats_essential</span>
                        </li>
                        <li className="flex justify-between gap-4 items-center border-b border-white/5 pb-2">
                            <span className="text-white/70 tracking-widest">STACK_OVERFLOW</span>
                            <span className="text-white/90 border-b-2" style={{ borderColor: yellowAccent }}>LIFELINE</span>
                        </li>
                        <li className="flex justify-between gap-4 items-center transition-all hover:translate-x-1">
                            <span className="text-white/70 tracking-widest">IMPOSTOR_SYNDROME</span>
                            <span className="italic text-white/60 lowercase">always_active</span>
                        </li>
                    </ul>
                    ...existing code...
                </div>
            </Card>
        </div>
    );
};

export default NeedsCard;
