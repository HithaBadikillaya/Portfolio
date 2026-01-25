import { Card } from 'pixel-retroui';
import PropTypes from 'prop-types';

const StatusCard = ({ yellowAccent }) => {
    return (
        <div className="relative group">
            <div className="absolute top-0 right-0 p-2 font-black text-[9px] uppercase z-10 border border-yellow-500 text-yellow-400 bg-transparent" style={{ borderColor: yellowAccent }}>
                reality_check
            </div>
            <Card
                bg="#000"
                shadowColor={yellowAccent}
                className="p-6 md:p-8 border-2"
                style={{ borderColor: yellowAccent }}
            >
                <div className="mb-4 mt-2">
                    <p
                        className="font-black uppercase leading-none text-xl md:text-3xl text-white"
                    >
                        [SYSTEM_STATUS]
                    </p>
                </div>
                <p className="font-bold text-sm md:text-base leading-relaxed text-white/90">
                Heads up: Powered by low-grade panic and commits that made sense briefly
                </p>
            </Card>
        </div>
    );
};

export default StatusCard;

StatusCard.propTypes = {
    yellowAccent: PropTypes.string.isRequired,
};
