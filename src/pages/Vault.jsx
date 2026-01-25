import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import VaultHeader from '../components/Vault/VaultHeader';
import StatusCard from '../components/Vault/StatusCard';
import DebugAccordion from '../components/Vault/DebugAccordion';
import NeedsCard from '../components/Vault/NeedsCard';
import StatsGrid from '../components/Vault/StatsGrid';
import ChangelogSection from '../components/Vault/ChangelogSection';
import DeploySection from '../components/Vault/DeploySection';
import ProcessRant from '../components/Vault/ProcessRant';
import { Button, Popup } from 'pixel-retroui';

const Vault = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    // Accent color constant
    const yellowAccent = "#FFD700";

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-yellow-500 selection:text-black pb-20 overflow-x-hidden">
            <SEO title="secret_corner" description="the fun corner of the internet" />

            {/* Popup Logic */}
            <div className="flex justify-end p-6 md:p-12">
                <Button
                    onClick={openPopup}
                    bg={yellowAccent}
                    shadow="black"
                    className="text-[10px] md:text-xs font-black uppercase text-white"
                >
                    vault_access_info
                </Button>
                <Popup
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    title="SYSTEM_MESSAGE"
                >
                    <div className="p-4 font-mono text-xs" style={{ color: 'black', backgroundColor: yellowAccent }}>
                        Welcome to the retro vault! Explore the hidden logs.
                        All professional filters have been disabled.
                    </div>
                </Popup>
            </div>

            <div className="max-w-4xl mx-auto px-6 md:px-0 space-y-12 md:space-y-16">

                {/* Header - Centered as requested */}
                <VaultHeader yellowAccent={yellowAccent} />

                <p className="text-center text-yellow-400 font-bold text-lg">
                    Previous pages were me in a suit; this is me in my pajamas yelling into the void. proceed at your own risk.
                </p>

                {/* System Warning */}
                <StatusCard yellowAccent={yellowAccent} />

                {/* Grid: Stack Trace & Needs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <DebugAccordion yellowAccent={yellowAccent} />
                    <NeedsCard yellowAccent={yellowAccent} />
                </div>

                {/* Metrics */}
                <StatsGrid yellowAccent={yellowAccent} />

                {/* Process rant: honest workflow and collaboration */}
                <ProcessRant yellowAccent={yellowAccent} />

                {/* Changelog & TODO */}
                <ChangelogSection yellowAccent={yellowAccent} />

                {/* Deploy */}
                <DeploySection yellowAccent={yellowAccent} />
            </div>
        </div>
    );
};

export default Vault;
