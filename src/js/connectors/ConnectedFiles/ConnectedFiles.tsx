import React, { ReactElement, useEffect } from 'react';
import FilesContainer from '../../containers/FilesContainer/FilesContainer';
import { getDirectoryListing, Listing } from '../../services/FileService';
import { Reducers } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFiles } from '../../store/files/filesActions';


export default function ConnectedFiles(): ReactElement {
    const dispatch = useDispatch();
    const [path, setPath] = React.useState('/');
    const files = useSelector((state: Reducers) => state.files.files);
    const kernelAvailable = useSelector((state: Reducers) => state.kernel.kernelAvailable);

    useEffect(() => {
        if (!kernelAvailable) {
            return;
        }

        dispatch(fetchFiles(path));
    }, [kernelAvailable, path]);

    return (
        <FilesContainer
            files={files}
        />
    );
}
