/**
 * Gets the file extension
 *
 * @export
 * @param {string} fileName
 * @returns {string}
 */
export default function getFileExtension(fileName: string): string {
    const fileNameSplitted = fileName.toString().split('.');
    return fileNameSplitted.pop();
}
