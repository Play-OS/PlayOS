import * as React from 'react';
import Dirent from 'memfs/lib/Dirent';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import WebIcon from '@material-ui/icons/Web';
import { getFileExtension, readFileAsync } from '../../../../services/FileSystemService';
import InstanceBag from '../../../../InstanceBag';
import { WasmFs } from '@wasmer/wasmfs';
import { getWappInformation } from '../../../../services/WappService';
const styles = require('./File.scss');

interface Props {
    file: Dirent;
    path: string;
    onClick?: (folder: Dirent) => void;
}

function getFileIcon(file: Dirent): any {
    const fileName: any = file.name;
    const fileExtension = getFileExtension(fileName);

    switch(fileExtension) {
        case 'wasm':
            return <WebIcon className={styles.icon}/>
        default:
            return <InsertDriveFileOutlinedIcon className={styles.icon}/>
    }
}

export default function File(props: Props) {
    const [icon, setIcon] = React.useState('');
    const [name, setName] = React.useState(props.file.name);

    React.useEffect(() => {
        async function processFile() {
            const fileName: any = props.file.name;
            const fileExtension = getFileExtension(fileName);

            if (fileExtension === 'wapp') {
                // We should read the wapp for an icon
                const wasmFs = InstanceBag.get<WasmFs>('fs');
                const file: any = await readFileAsync(wasmFs.fs, `${props.path}/${props.file.name}`);
                const info = await getWappInformation(file);

                if (info !== null) {
                    setIcon(info.icon);
                    setName(info.app.short_name);
                }
            }
        }

        processFile();
    }, []);

    return (
        <div className={styles.file}>
            <div className={styles.iconWrapper} onClick={() => props.onClick(props.file)}>
                {icon === '' && getFileIcon(props.file)}
                {icon !== '' && <img className={styles.appIcon} src={icon} />}
            </div>
            <span>{name}</span>
        </div>
    );
}
