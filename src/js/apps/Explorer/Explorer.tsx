import * as React from 'react';
import AppHeader from '../../components/molecules/AppHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
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
    const [path, setPath] = React.useState('/');

    React.useEffect(() => {
        const wasmFs = InstanceBag.get<WasmFs>('fs');
        const filesAndDirectories: any = wasmFs.fs.readdirSync(path, {
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

    return (
        <>
            <AppHeader title="Files" menu={
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
