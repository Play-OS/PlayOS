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

interface Application {
    id: string,
    title: string,
    main: string,
    icon: string,
    properties?: ApplicationProperties,
    status: ApplicationStatus,
    isFolder?: boolean,
    // isRemoteFolder?: boolean,
    apps?: Application[],
    // businessInfo: {
    //     name: string,
    //     id: string,
    // },
    supportedDeviceTypes: string[],
}

export default Application;
