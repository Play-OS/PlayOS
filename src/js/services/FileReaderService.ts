interface ProcessedFile {
    name: string;
    size: number;
    bin: ArrayBuffer;
}

export function readFileAsArrayBuffer(file: File): Promise<ProcessedFile> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onerror = (error) => {
            reject(error);
        }

        fileReader.onload = () => {
            resolve({
                name: file.name,
                size: file.size,
                bin: fileReader.result as ArrayBuffer,
            });
        }

        fileReader.readAsArrayBuffer(file);
    });
}
