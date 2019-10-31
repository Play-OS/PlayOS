// @ts-ignore
import WasmFs from "@wasmer/wasmfs/lib/index.esm";

export function createFs() {
    const envContents = '$PWD=/\n$SHELL=/\nPWD=/\nSHELL=/\n$PATH=/\nPATH=/\nUSER=franklinwaller\n$USER=franklinwaller';
    const wasmFs = new WasmFs();

    console.log('[] wasmFs -> ', wasmFs);

    wasmFs.fs.mkdirSync('/Applications/');
    wasmFs.fs.mkdirSync('/Library/');
    wasmFs.fs.mkdirSync('/System/');
    wasmFs.fs.mkdirSync('/Users/franklinwaller/', {
        recursive: true,
    });

    wasmFs.fs.writeFileSync('/dev/null', envContents);
    // wasmFs.fs.writeFileSync('.env', envContents);
    wasmFs.fs.writeFileSync('/Users/.env', envContents);
    wasmFs.fs.writeFileSync('/Users/franklinwaller/.env', envContents);

    return wasmFs;
}
