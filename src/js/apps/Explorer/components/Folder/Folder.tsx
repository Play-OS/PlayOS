import * as React from 'react';
import Dirent from 'memfs/lib/Dirent';
import FolderIcon from '@material-ui/icons/Folder';
import getFileExtension from '../../../../services/micro/getFileExtension';
import { getWappInformation } from '../../../../services/WappService';

const styles = require('./Folder.scss');

const WAPP_EXTENSION = 'wapp';

interface Props {
    folder: Dirent;
    path: string;
    onClick?: (folder: Dirent) => void;
}

export default function Folder(props: Props) {
    const [icon, setIcon] = React.useState('');
    const [name, setName] = React.useState(props.folder.name);

    React.useEffect(() => {
        async function processFile() {
            // This is a special folder with an "extension"
            const folderName: any = props.folder.name;
            const folderExtension = getFileExtension(folderName);

            if (folderExtension === WAPP_EXTENSION) {
                const wappInfo = await getWappInformation(`${props.path}/${folderName}`);


                // We should read the wapp for an icon
                // const wasmFs = InstanceBag.get<WasmFs>('fs');
                // const file: any = await readFileAsync(wasmFs.fs, `${props.path}/${props.file.name}`);
                // const info = await getWappInformation(file);

                if (wappInfo !== null) {
                    const newFolderName = folderName.replace('.' + WAPP_EXTENSION, '');

                    setIcon(wappInfo.icon);
                    setName(newFolderName);
                }
            }
        }

        processFile();
    }, []);

    return (
        <div className={styles.folder}>
            <div className={styles.iconWrapper} onClick={() => props.onClick(props.folder)}>
                {icon === '' && <FolderIcon className={styles.icon} />}
                {icon !== '' && <img className={styles.appIcon} src={icon} />}
            </div>
            <span>{name}</span>
        </div>
    );
}
