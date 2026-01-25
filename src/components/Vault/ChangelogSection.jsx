/* eslint-disable react/jsx-no-comment-textnodes */
import { Card } from 'pixel-retroui';

// eslint-disable-next-line react/prop-types
const ChangelogSection = ({ yellowAccent }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
                <p className="font-black lowercase italic tracking-widest text-xs md:text-sm text-white/60">changelog.TXT</p>
                <Card shadowColor={yellowAccent} bg="#000" borderSize={2} className="p-6 md:p-8 space-y-4 italic font-bold text-xs md:text-sm border-2 text-white" style={{ borderColor: yellowAccent }}>
                    <p className="font-black not-italic uppercase tracking-widest text-lg inline-block text-black" style={{ backgroundColor: yellowAccent, padding: '2px 6px' }}>v1.0.42</p>
                    <ul className="space-y-3 text-white/85">
                        <li className="flex gap-2"><span>-</span> <span>fixed that weird bug (dont ask how)</span></li>
                        <li className="flex gap-2"><span>-</span> <span>renamed variables bc past me had zero chill</span></li>
                        <li className="flex gap-2"><span>-</span> <span>added comments (will delete later)</span></li>
                    </ul>
                </Card>
            </div>
            <div className="flex items-center justify-center p-8 border-4 border-dashed border-white/10 hover:border-white/30 transition-all cursor-help group rounded-xl bg-white/[0.02]">
                <p className="opacity-60 italic font-bold text-center text-xs md:text-base group-hover:opacity-100 transition-opacity leading-relaxed text-white/70">
                    // TODO: delete this entire section <br className="hidden md:block" /> before job interviews
                </p>
            </div>
        </div>
    );
};

export default ChangelogSection;
