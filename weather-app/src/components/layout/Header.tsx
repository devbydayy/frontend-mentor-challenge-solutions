'use client';

import { useEffect, useState } from 'react';
import UnitSelector from "../weather/UnitSelector";

export default function Header() {
    const [installPrompt, setInstallPrompt] = useState<any>(null);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setInstallPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!installPrompt) return;

        installPrompt.prompt();
        const choice = await installPrompt.userChoice;

        if (choice.outcome === 'accepted') {
            console.log('App installed');
        }

        setInstallPrompt(null);
    };

    return (
        <header className="py-4 px-4 lg:px-8">
            <div className="container mx-auto flex justify-between items-center max-w-desktop">
                
                <div className="flex items-center gap-3">
                    <img src="/images/logo.svg" alt="Weather Now Logo"/>
                </div>

                <div className="flex items-center gap-3">
                    {installPrompt && (
                        <button
                            onClick={handleInstall}
                            className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm"
                        >
                            Install
                        </button>
                    )}

                    <UnitSelector />
                </div>

            </div>
        </header>
    );
}
