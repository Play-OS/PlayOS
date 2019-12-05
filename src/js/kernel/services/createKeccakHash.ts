import * as keccak from 'keccak';

/**
 * Creates a hash using the keccak256 algorythm
 *
 * @export
 * @param {string} digest
 * @returns {string}
 */
export default function keccak256(digest: string): string {
    return keccak('keccak256').update(digest).digest().toString('hex');
}
