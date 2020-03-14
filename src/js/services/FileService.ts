import { spawnTerminalProcess } from './TerminalService';

export interface Listing {
    name: string;
    isFile: boolean;
    isFolder: boolean;
}

export async function getDirectoryListing(path: string): Promise<Listing[]> {
    const listing: Listing[] = [];
    const process = await spawnTerminalProcess(['ls', '-F', path], {});

    return new Promise((resolve) => {
        process.on('message', (message: string) => {
            const name = message.trim();

            if (name.endsWith('/')) {
                listing.push({
                    name: name.slice(0, name.length - 1),
                    isFile: false,
                    isFolder: true,
                });
            } else {
                listing.push({
                    name,
                    isFile: true,
                    isFolder: false,
                });
            }
        });

        process.on('exit', () => {
            resolve(listing);
        });
    });
}

export async function getFile(path: string): Promise<Buffer> {
    const process = await spawnTerminalProcess(['cat', path], {});
    let output = '';

    return new Promise((resolve) => {
        process.on('message', (message: string) => {
            output += message;
        });

        process.on('exit', () => {
            console.log('[] buffer -> ', output);
            resolve(Buffer.from(output));
        });
    });
}
