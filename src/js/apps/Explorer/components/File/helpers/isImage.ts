const IMAGE_EXTENSIONS = [
    'jpg',
    'png',
    'jpeg',
    'gif',
    'tiff',
];

export default function isImage(extension: string): boolean {
    return IMAGE_EXTENSIONS.includes(extension.toLowerCase());
}
