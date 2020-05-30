import React, { ReactElement } from 'react';
import { Listing } from '../../services/FileService';

interface Props {
    files: Listing[];
}


export default function FilesContainer({
    files,
}: Props): ReactElement {
    return (
        <div>
            Hi
        </div>
    );
}
