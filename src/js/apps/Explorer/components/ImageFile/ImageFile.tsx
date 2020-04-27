import React from 'react';
import { Listing, getFile, getFileUrl } from '../../../../services/FileService';
import InstanceBag from '../../../../InstanceBag';
import isImage from '../File/helpers/isImage';
import getFileExtension from '../../../../services/micro/getFileExtension';
import Kernel from '../../../../../vendor/kernel';
import styles from './ImageFile.module.scss';

interface Props {
    file: Listing;
    path: string;
}

export default function ImageFile(props: Props) {
    const [imageUrl, setImageUrl] = React.useState('');

    React.useEffect(() => {
        async function processFile() {
            const kernel = InstanceBag.get<Kernel>('kernel');
            const fileName: any = props.file.name;
            const fileExtension = getFileExtension(fileName);

            if (isImage(fileExtension)) {
                const x = await getFile(`${props.path}/${props.file.name}`);
                console.log('[] x -> ', x);
                const file = await kernel.provider.fetchFile(`${props.path}/${props.file.name}`);

                if (file) {
                    setImageUrl(getFileUrl(file));
                }
            }
        }

        processFile();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageFrame}>
                <img src={imageUrl} alt={props.file.name} />
            </div>
        </div>
    );
}
