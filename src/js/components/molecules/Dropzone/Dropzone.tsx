import * as React from 'react';
import Kernel from '@playos/kernel';
import { useDropzone } from 'react-dropzone';
import InstanceBag from '../../../InstanceBag';
import { readFileAsArrayBuffer } from '../../../services/FileReaderService';

interface Props {
    className?: string;
    currentPath: string;
    children: React.ReactNode;
}

export default function Dropzone(props: Props) {
    const { currentPath, className, children } = props;

    const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
        const kernel = InstanceBag.get<Kernel>('kernel');
        const promises = acceptedFiles.map((file) => readFileAsArrayBuffer(file));
        const processedFiles = await Promise.all(promises);

        processedFiles.forEach((file) => {
            const path = `${props.currentPath}/${file.name}`;
            // Filter out trailing slashes
            const newPath = path.split('/').filter((p) => p).join('/');

            kernel.fs.writeFile(newPath, new Uint8Array(file.bin));
        });
    }, [currentPath]);

    const { getInputProps, getRootProps, isDragActive } = useDropzone({ onDrop, noClick: true });

    return (
        <div className={className} {...getRootProps()}>
            <input {...getInputProps()} />
            {children}
        </div>
    );
}
