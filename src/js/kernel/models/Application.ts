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

export default Application;
