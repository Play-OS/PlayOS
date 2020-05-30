import { setFilesLoading, setFiles } from './files';
import { getDirectoryListing } from '../../services/FileService';

export function fetchFiles(path: string) {
    return async (dispatch: Function) => {
        dispatch(setFilesLoading(true));

        const files = await getDirectoryListing(path);

        dispatch(setFiles(files));
        dispatch(setFilesLoading(false));
    }
}
