import * as React from 'react';
import Dirent from 'memfs/lib/Dirent';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import WebIcon from '@material-ui/icons/Web';
import { getFileExtension } from '../../../../services/FileSystemService';
const styles = require('./File.scss');

interface Props {
    file: Dirent;
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

    React.useEffect(() => {
        async function processFile() {
            const fileName: any = props.file.name;
            const fileExtension = getFileExtension(fileName);

            if (fileExtension === 'wapp') {
                // We should read the wapp for an icon
            }
        }

        processFile();
    }, []);

    return (
        <div className={styles.file}>
            <div className={styles.iconWrapper} onClick={() => props.onClick(props.file)}>
                {icon === '' && getFileIcon(props.file)}
            </div>
            <span>{props.file.name}</span>
        </div>
    );
}
