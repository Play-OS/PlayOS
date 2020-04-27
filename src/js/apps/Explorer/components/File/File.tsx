import * as React from 'react';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import WebIcon from '@material-ui/icons/Web';
import getFileExtension from '../../../../services/micro/getFileExtension';
import { Listing, getFile } from '../../../../services/FileService';
import isImage from './helpers/isImage';
import InstanceBag from '../../../../InstanceBag';
import Kernel from '../../../../../vendor/kernel';
import ImageFile from '../ImageFile';

const styles = require('./File.module.scss');

interface Props {
    file: Listing;
    path: string;
    onClick: (folder: Listing) => void;
}

function getFileIcon(file: Listing, path: string): any {
    const fileName: any = file.name;
    const fileExtension = getFileExtension(fileName);

    if (fileExtension === 'wasm') {
        return <WebIcon className={styles.icon}/>
    } else if (isImage(fileExtension)) {
        return <ImageFile file={file} path={path} />
    } else {
        return <InsertDriveFileOutlinedIcon className={styles.icon}/>
    }
}

export default function File(props: Props) {
    const [icon] = React.useState('');
    const [name] = React.useState(props.file.name);

    return (
        <div className={styles.file}>
            <div className={styles.iconWrapper} onClick={() => props.onClick(props.file)}>
                {icon === '' && getFileIcon(props.file, props.path)}
                {icon !== '' && <img alt={name.toString()} className={styles.appIcon} src={icon} />}
            </div>
            <span>{name}</span>
        </div>
    );
}
