import React from 'react';
import { Card } from 'pixel-retroui';

const ChangelogSection = ({ yellowAccent }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
                <p className="font-black lowercase italic tracking-widest opacity-40 text-xs md:text-sm text-primary">changelog.TXT</p>
                <Card shadowColor="rgba(0,0,0,0.1)" bg="var(--color-paper)" borderSize={2} className="p-6 md:p-8 space-y-4 opacity-100 italic font-bold text-xs md:text-sm border-2 border-primary/10 text-primary">
                    <p className="font-black not-italic uppercase tracking-widest text-lg" style={{ backgroundColor: yellowAccent, display: 'inline-block', padding: '2px 6px' }}>v1.0.42</p>
                    <ul className="space-y-3 opacity-70">
                        <li className="flex gap-2"><span>-</span> <span>fixed that weird bug (dont ask how)</span></li>
                        <li className="flex gap-2"><span>-</span> <span>renamed variables bc past me had zero chill</span></li>
                        <li className="flex gap-2"><span>-</span> <span>added comments (will delete later)</span></li>
                    </ul>
                </Card>
            </div>
            <div className="flex items-center justify-center p-8 border-4 border-dashed border-primary/10 hover:border-primary/30 transition-all cursor-help group rounded-xl bg-primary/[0.02]">
                <p className="opacity-30 italic font-bold text-center text-xs md:text-base group-hover:opacity-100 transition-opacity leading-relaxed text-primary">
                    // TODO: delete this entire section <br className="hidden md:block" /> before job interviews
                </p>
            </div>
        </div>
    );
};

export default ChangelogSection;
