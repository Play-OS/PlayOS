
function getRGBComponents(color: string) {
    const r = color.substring(1, 3);
    const g = color.substring(3, 5);
    const b = color.substring(5, 7);

    return {
        R: parseInt(r, 16),
        G: parseInt(g, 16),
        B: parseInt(b, 16),
    };
}

/**
 * Gets the ideal text color for a background
 *
 * @export
 * @param {string} bgColor A hex color, ex: #665544
 * @returns {string}
 */
export default function getIdealTextColor(bgColor: string) {
    const nThreshold = 105;
    const components = getRGBComponents(bgColor);
    const bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

    return ((255 - bgDelta) < nThreshold) ? '#000000' : '#ffffff';
}
