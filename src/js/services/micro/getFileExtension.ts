/**
 * Gets the file extension
 *
 * @export
 * @param {string} fileName
 * @returns {string}
 */
export default function getFileExtension(fileName: string): string {
    const fileNameSplitted = fileName.toString().split('.');
    const extension = fileNameSplitted.pop();

    if (!extension) {
        return '';
    }

    return extension;
}
