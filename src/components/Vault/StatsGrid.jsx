import React from 'react';
import { Bubble } from 'pixel-retroui';

const StatsGrid = ({ yellowAccent }) => {
    const stats = [
        { label: 'UPTIME', value: 'coffee-dependent' },
        { label: 'BUGS_FIXED', value: 'created_more' },
        { label: 'CONFIDENCE', value: 'varies_wildly' },
        { label: 'TABS_OPEN', value: '99+' }
    ];

    return (
        <div className="space-y-4">
            <p className="font-black lowercase italic tracking-widest opacity-40 text-xs md:text-sm text-black">real_stats.LOG</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((metric, idx) => (
                    <div key={metric.label} className="aspect-square">
                        <Bubble
                            direction="top"
                            className="w-full h-full flex flex-col justify-between p-4 cursor-crosshair group hover:-translate-y-1 transition-transform duration-200"
                            bg="#fff"
                            borderColor="black"
                            borderSize={3}
                        >
                            <p
                                className="opacity-40 text-[9px] font-black uppercase leading-[1.2] group-hover:opacity-100 transition-opacity text-black"
                            >
                                {metric.label}
                            </p>
                            <p className="font-black text-sm md:text-lg leading-tight uppercase text-center text-black group-hover:scale-110 transition-transform">
                                {metric.value}
                            </p>
                        </Bubble>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsGrid;
