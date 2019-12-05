/**
 * Converts a string to a byte array
 *
 * @export
 * @param {string} str
 * @returns {Uint8Array}
 */
export default function stringToBytes(str: string): Uint8Array {
    const byteArray = new Uint8Array(str.length);

    for (let i = 0; i < str.length; i += 1) {
        byteArray[i] = str.charCodeAt(i);
    }

    return byteArray;
}
