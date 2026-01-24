import React from 'react';
import { Card } from 'pixel-retroui';

const NeedsCard = ({ yellowAccent }) => {
    return (
        <div className="space-y-4 h-full">
            <p className="font-black lowercase italic tracking-widest opacity-40 text-xs md:text-sm text-primary">daily_needs.MD</p>
            <Card shadowColor={yellowAccent} bg="var(--color-paper)" className="p-6 md:p-8 h-full border-4 border-primary/5 text-primary">
                <div className="space-y-6">
                    <p
                        className="font-black uppercase border-b-4 inline-block text-sm md:text-base pb-1 tracking-tighter"
                        style={{ borderBottomColor: yellowAccent }}
                    >
                        Requirements:
                    </p>
                    <ul className="space-y-4 font-bold text-xs md:text-sm">
                        <li className="flex justify-between gap-4 items-center border-b border-black/5 pb-2">
                            <span className="opacity-50 tracking-widest">COFFEE</span>
                            <span className="text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-widest" style={{ backgroundColor: yellowAccent }}>MANDATORY</span>
                        </li>
                        <li className="flex justify-between gap-4 items-center border-b border-black/5 pb-2">
                            <span className="opacity-50 tracking-widest">SPOTIFY</span>
                            <span className="italic lowercase opacity-80" style={{ color: 'black' }}>lofi_beats_essential</span>
                        </li>
                        <li className="flex justify-between gap-4 items-center border-b border-black/5 pb-2">
                            <span className="opacity-50 tracking-widest">STACK_OVERFLOW</span>
                            <span className="opacity-80 border-b-2" style={{ borderColor: yellowAccent }}>LIFELINE</span>
                        </li>
                        <li className="flex justify-between gap-4 items-center transition-all hover:translate-x-1">
                            <span className="opacity-50 tracking-widest">IMPOSTOR_SYNDROME</span>
                            <span className="italic opacity-40 lowercase">always_active</span>
                        </li>
                    </ul>
                </div>
            </Card>
        </div>
    );
};

export default NeedsCard;
