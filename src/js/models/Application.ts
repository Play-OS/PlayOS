interface ApplicationProperties {
    background_color: string,
    openInNewWindow?: boolean,
    background_url?: string,
    intents?: {
        os_file_open?: {
            extensions?: string[],
            mimeTypes: string[],
        }
    },
}

export enum ApplicationStatus {
    STANDARD = 'STANDARD',
}

interface ApplicationIcon {
    src: string;
    type: string;
    sizes: string;
}

interface PlayOSProperties {
    isPwa?: boolean;
    isWasm: boolean;
    showTerminal: boolean;
}

interface Application {
    id: string,
    name: string,
    short_name: string;
    icons: ApplicationIcon[];
    start_url: string;
    scope: string;
    display: string;
    background_color: string;
    theme_color: string;
    manifest_url: string;

    // PlayOS specific features
    playos?: PlayOSProperties;

    // properties?: ApplicationProperties,
    // status: ApplicationStatus,
    // isFolder?: boolean,
    // isRemoteFolder?: boolean,
    // apps?: Application[],
    // businessInfo: {
    //     name: string,
    //     id: string,
    // },
    // supportedDeviceTypes: string[],
}

export interface ApplicationViewModel {
    name: string;
    short_name: string;
    manifest_url: string;
    icons: ApplicationIcon[];
}

function resolveApplicationIcons(icon: ApplicationIcon, baseUrl: string): ApplicationIcon {
    const url = new URL(icon.src, baseUrl);

    return {
        src: url.href,
        sizes: icon.sizes,
        type: icon.type,
    }
}

export function transformToApplicationViewModel(app: Application, manifestUrl: string): ApplicationViewModel {
    return {
        name: app.name || 'Unknown app',
        icons: Array.isArray(app.icons) ? app.icons.map(icon => resolveApplicationIcons(icon, manifestUrl)) : [],
        short_name: app.short_name || 'Unknown app',
        manifest_url: manifestUrl,
    }
}

export default Application;
