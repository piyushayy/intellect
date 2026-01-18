"use client";

import useSound from 'use-sound';
import { useEffect } from 'react';

// Using free open-source sounds or placeholder URLs
const SOUNDS = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Soft click
    success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3', // Success chime
    hover: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Subtle hover
};

export function useAppSounds() {
    const [playClick] = useSound(SOUNDS.click, { volume: 0.5 });
    const [playSuccess] = useSound(SOUNDS.success, { volume: 0.4 });
    const [playHover] = useSound(SOUNDS.hover, { volume: 0.1 });

    return { playClick, playSuccess, playHover };
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
    // We could add global click listeners here if we wanted generic sound everywhere
    return <>{ children } </>;
}
