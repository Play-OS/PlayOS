import * as React from 'react';
import Dirent from 'memfs/lib/Dirent';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import WebIcon from '@material-ui/icons/Web';
import getFileExtension from '../../../../services/micro/getFileExtension';
import { Listing } from '../../../../services/FileService';

const styles = require('./File.module.scss');

interface Props {
    file: Listing;
    path: string;
    onClick: (folder: Listing) => void;
}

function getFileIcon(file: Listing): any {
    const fileName: any = file.name;
    const fileExtension = getFileExtension(fileName);

    switch (fileExtension) {
    case 'wasm':
        return <WebIcon className={styles.icon}/>
    default:
        return <InsertDriveFileOutlinedIcon className={styles.icon}/>
    }
}

export default function File(props: Props) {
    const [icon] = React.useState('');
    const [name] = React.useState(props.file.name);

    React.useEffect(() => {
        async function processFile() {
            const fileName: any = props.file.name;
            const fileExtension = getFileExtension(fileName);

            if (fileExtension === 'jpg') {

            }
        }

        processFile();
    });

    return (
        <div className={styles.file}>
            <div className={styles.iconWrapper} onClick={() => props.onClick(props.file)}>
                {icon === '' && getFileIcon(props.file)}
                {icon !== '' && <img alt={name.toString()} className={styles.appIcon} src={icon} />}
            </div>
            <span>{name}</span>
        </div>
    );
}
