import { useState } from 'react';
import VaultHeader from '../components/Vault/VaultHeader';
import StatusCard from '../components/Vault/StatusCard';
import DebugAccordion from '../components/Vault/DebugAccordion';
import NeedsCard from '../components/Vault/NeedsCard';
import StatsGrid from '../components/Vault/StatsGrid';
import ChangelogSection from '../components/Vault/ChangelogSection';
import DeploySection from '../components/Vault/DeploySection';
import ProcessRant from '../components/Vault/ProcessRant';
import { Popup } from 'pixel-retroui';

const Vault = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const closePopup = () => setIsPopupOpen(false);

    const yellowAccent = "#FFD700";

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-yellow-500 selection:text-black pb-20 overflow-x-hidden">
            <>
                <title>vault | Hitha </title>
                <meta name="description" content="me being a mess" />
                <meta property="og:title" content="vault | Hitha Portfolio" />
                <meta property="og:description" content="me being a mess" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="vault | Hitha Portfolio" />
                <meta name="twitter:description" content="me being a mess" />
            </>

            <div className="flex justify-end p-6 md:p-12">
                <Popup
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    title="SYSTEM_MESSAGE"
                >
                    <div className="p-4 font-mono text-xs" style={{ color: 'black', backgroundColor: yellowAccent }}>
                        All professional filters have been disabled.
                    </div>
                </Popup>
            </div>

            <div className="max-w-4xl mx-auto px-6 md:px-0 space-y-12 md:space-y-16">

                <VaultHeader yellowAccent={yellowAccent} />

                <p className="text-center text-yellow-400 font-bold text-base md:text-lg">
                   The hints were painfully obvious, so you either followed them properly or just got lucky by aggressively clicking. Either way — good job!.
                </p>

                <StatusCard yellowAccent={yellowAccent} />

                {/* Grid*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <DebugAccordion yellowAccent={yellowAccent} />
                    <NeedsCard yellowAccent={yellowAccent} />
                </div>

                <StatsGrid yellowAccent={yellowAccent} />
                <ProcessRant yellowAccent={yellowAccent} />
                <ChangelogSection yellowAccent={yellowAccent} />
                <DeploySection yellowAccent={yellowAccent} />
            </div>
        </div>
    );
};

export default Vault;
