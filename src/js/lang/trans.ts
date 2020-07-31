import translations from './translations.eng.json';

export default function trans(key: string): string {
    // @ts-ignore
    const result = translations[key];

    if (!result) {
        return key;
    }

    return result;
}
