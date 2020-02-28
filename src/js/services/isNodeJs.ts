export default function isNodeJs(): boolean {
    if (typeof window === 'undefined' && typeof process !== 'undefined' && typeof process.release !== 'undefined' && process.release.name === 'node') {
        return true;
    }

    return false;
}
