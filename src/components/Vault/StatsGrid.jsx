import { Bubble } from 'pixel-retroui';
import PropTypes from 'prop-types';

const StatsGrid = ({ yellowAccent }) => {
    const stats = [
        { label: 'UPTIME', value: 'ahhhhhhhh' },
        { label: 'BUGS_FIXED', value: 'created_more' },
        { label: 'CONFIDENCE', value: 'varies_wildly' },
        { label: 'TABS_OPEN', value: '99+' }
    ];

    return (
        <div className="space-y-4">
            <p className="font-black lowercase italic tracking-widest text-xs md:text-sm text-white/60">real_stats.LOG</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((metric) => (
                    <div key={metric.label} className="aspect-square">
                        <Bubble
                            direction="top"
                            className="w-full h-full flex flex-col justify-between p-4 cursor-crosshair group hover:-translate-y-1 transition-transform duration-200"
                            bg="#0f1724"
                            borderColor={yellowAccent}
                            style={{ backgroundColor: '#0f1724', borderColor: yellowAccent }}
                        >
                            <p
                                className="opacity-60 text-[9px] font-black uppercase leading-[1.2] group-hover:opacity-100 transition-opacity text-white/80"
                            >
                                {metric.label}
                            </p>
                            <p className="font-black text-sm md:text-lg leading-tight uppercase text-center text-white group-hover:scale-110 transition-transform">
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

StatsGrid.propTypes = {
    yellowAccent: PropTypes.string.isRequired,
};
