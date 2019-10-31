import * as React from 'react';
import Dirent from 'memfs/lib/Dirent';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
const styles = require('./File.scss');

interface Props {
    file: Dirent;
    onClick?: (folder: Dirent) => void;
}

export default function File(props: Props) {
    return (
        <div className={styles.file}>
            <InsertDriveFileOutlinedIcon className={styles.icon} onClick={() => props.onClick(props.file)} />
            <span>{props.file.name}</span>
        </div>
    );
}
