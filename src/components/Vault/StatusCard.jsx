import React from 'react';
import { Card } from 'pixel-retroui';

const StatusCard = ({ yellowAccent }) => {
    return (
        <div className="relative group">
            <div className="absolute top-0 right-0 p-2 text-primary font-black text-[8px] uppercase z-10" style={{ backgroundColor: yellowAccent }}>
                reality_check
            </div>
            <Card
                bg="#fff"
                shadowColor={yellowAccent}
                className="p-6 md:p-8 border-4 border-black/5"
            >
                <div className="mb-4 mt-2">
                    <p
                        className="font-black uppercase leading-none text-xl md:text-3xl text-primary"
                    >
                        [SYSTEM_STATUS]
                    </p>
                </div>
                <p className="font-bold text-sm md:text-base leading-relaxed text-primary">
                    Warning: This developer runs on caffeine, impostor syndrome, and the hope that nobody reads the commit history too closely.
                </p>
            </Card>
        </div>
    );
};

export default StatusCard;
