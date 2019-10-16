export default function resolveUrl(url: string, relativeUrl: string) {
    return new URL(relativeUrl, url).href;
}
