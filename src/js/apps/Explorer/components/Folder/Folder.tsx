import * as React from 'react';
import Dirent from 'memfs/lib/Dirent';
import FolderIcon from '@material-ui/icons/Folder';
const styles = require('./Folder.scss');

interface Props {
    folder: Dirent
    onClick?: (folder: Dirent) => void;
}

export default function Folder(props: Props) {
    return (
        <div className={styles.folder}>
            <FolderIcon className={styles.icon} onClick={() => props.onClick(props.folder)}  />
            <span>{props.folder.name}</span>
        </div>
    );
}
