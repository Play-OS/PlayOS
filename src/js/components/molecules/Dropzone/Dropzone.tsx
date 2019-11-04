import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import WasmFs from "@wasmer/wasmfs";
import InstanceBag from '../../../InstanceBag';
import { readFileAsArrayBuffer } from '../../../services/FileReaderService';

interface Props {
    className?: string;
    currentPath: string;
    children: React.ReactNode;
}

export default function Dropzone(props: Props) {
    const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
        const wasmFs = InstanceBag.get<WasmFs>('fs');
        const promises = acceptedFiles.map(file => readFileAsArrayBuffer(file));
        const processedFiles = await Promise.all(promises);

        processedFiles.forEach((file) => {
            const path = `${props.currentPath}/${file.name}`;
            wasmFs.fs.writeFileSync(path, new Uint8Array(file.bin));
        });
    }, [props.currentPath]);

    const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop, noClick: true });

    return (
        <div className={props.className} {...getRootProps()}>
            <input {...getInputProps()} />
            {props.children}
        </div>
    );
}
