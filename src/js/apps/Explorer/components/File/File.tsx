import * as React from 'react';
import Dirent from 'memfs/lib/Dirent';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import WebIcon from '@material-ui/icons/Web';
const styles = require('./File.scss');

interface Props {
    file: Dirent;
    onClick?: (folder: Dirent) => void;
}

function getFileIcon(file: Dirent): any {
    const fileNameSplitted = file.name.toString().split('.');
    const fileExtension = fileNameSplitted.pop();

    switch(fileExtension) {
        case 'wasm':
            return <WebIcon className={styles.icon}/>
        default:
            return <InsertDriveFileOutlinedIcon className={styles.icon}/>
    }
}

export default function File(props: Props) {
    return (
        <div className={styles.file}>
            <div className={styles.iconWrapper} onClick={() => props.onClick(props.file)}>
                {getFileIcon(props.file)}
            </div>
            <span>{props.file.name}</span>
        </div>
    );
}
