import React from 'react';
import { Card } from 'pixel-retroui';

const DebugAccordion = ({ yellowAccent }) => {
    return (
        <div className="space-y-4 h-full">
            <p className="font-black lowercase italic tracking-widest opacity-40 text-xs md:text-sm text-primary">debug_log.ERR</p>
            <Card shadowColor="rgba(0,0,0,0.1)" bg="var(--color-paper)" className="p-6 md:p-8 font-mono text-[10px] md:text-xs h-full border-2 border-primary/5 text-primary">
                <div className="space-y-3">
                    <p className="opacity-60 font-bold"># ReferenceError: confidence not found</p>
                    <p className="pl-4 border-l-2 border-primary/10">at 3am_coding_session (brain/focus.js:404)</p>
                    <p className="pl-4 border-l-2 border-primary/10">at deadline_panic.catch()</p>
                    <p className="pl-4 border-l-2 border-primary/10">at google_every_syntax_error.loop()</p>
                    <div className="mt-6 pt-4 border-t-2 border-primary/5">
                        <p className="font-black uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
                            # Status: <span style={{ backgroundColor: yellowAccent, padding: '0 4px' }}>functioning_but_confused</span>
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DebugAccordion;
