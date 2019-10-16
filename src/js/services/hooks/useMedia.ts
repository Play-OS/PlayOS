import { useState, useEffect } from "react";

export default function useMedia(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        media.addListener(listener);

        // Component unmount
        return () => media.removeListener(listener);

        // Realod the effect if matches/query changed
    }, [matches, query]);

    return matches;
}
