import FileSystem from './FileSystem';

const AirhornerWappJson = require('../apps/Airhorner.wapp/manifest.json');
const TerminalWappJson = require('../apps/Terminal.wapp/manifest.json');

class WasmApplication {
    static async createDefaultApps(fs: FileSystem) {
        await fs.makeDir('/Applications/Airhorner.wapp/');
        await fs.makeDir('/Applications/Terminal.wapp/');

        await fs.writeFile('/Applications/Airhorner.wapp/manifest.json', JSON.stringify(AirhornerWappJson));
        await fs.writeFile('/Applications/Terminal.wapp/manifest.json', JSON.stringify(TerminalWappJson));
    }
}

export default WasmApplication;
