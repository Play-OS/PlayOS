import * as React from 'react';
import AppHeader from '../../components/molecules/AppHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InstanceBag from '../../InstanceBag';
import WasmFs from "@wasmer/wasmfs";
import Folder from './components/Folder';
import File from './components/File';
import Dirent from 'memfs/lib/Dirent';
const styles = require('./Explorer.scss');

export default function Explorer() {
    const [isLocationsOpen, setLocationsOpen] = React.useState(true);
    const [files, setFiles] = React.useState<Dirent[]>([]);
    const [path, setPath] = React.useState('');

    React.useEffect(() => {
        const wasmFs = InstanceBag.get<WasmFs>('fs');
        const newPath = path === '' ? '/' : path;
        const filesAndDirectories: any = wasmFs.fs.readdirSync(newPath, {
            encoding: "utf8",
            withFileTypes: true,
        });

        setFiles(filesAndDirectories);
    }, [path]);

    function handleFileClick(file: Dirent) {
        // Directories should just navigate to the next page
        if (file.isDirectory()) {
            setPath(`${path}/${file.name}`);
        }
    }

    function handleFolderUpButtonClick() {
        const splittedPath = path.split('/');
        splittedPath.pop();

        const newPath = splittedPath.join('/');
        setPath(newPath);
    }

    const currentPathFolder = path.split('/').pop();
    const appHeaderTitle = currentPathFolder === '' ? 'Files' : currentPathFolder;

    return (
        <>
            <AppHeader title={appHeaderTitle} toolbar={
                <>
                    <IconButton>
                        <CreateNewFolderOutlinedIcon className={styles.toolbarButton} />
                    </IconButton>
                    <IconButton onClick={handleFolderUpButtonClick}>
                        <ArrowUpwardIcon className={styles.toolbarButton} />
                    </IconButton>
                </>
            }

            menu={
                <List>
                    <ListItem button onClick={() => setLocationsOpen(!isLocationsOpen)}>
                        <ListItemText primary="Locations" />
                        {isLocationsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={isLocationsOpen} unmountOnExit>
                        <ListItem button onClick={() => setPath('/')}>
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Main Drive" />
                        </ListItem>
                    </Collapse>
                </List>
            }>
                <div className={styles.files}>
                    {files.map((file) => {
                        if (file.isDirectory()) {
                            return <Folder key={file.name.toString()} folder={file} onClick={handleFileClick} />
                        } else if (file.isFile()) {
                            return <File key={file.name.toString()} file={file} onClick={handleFileClick} />
                        }
                    })}
                </div>
            </AppHeader>
        </>
    );
}