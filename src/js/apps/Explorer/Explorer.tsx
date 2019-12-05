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
import Folder from './components/Folder';
import File from './components/File';
import Dirent from 'memfs/lib/Dirent';
import Dropzone from '../../components/molecules/Dropzone';
import Kernel from '../../kernel';
const styles = require('./Explorer.scss');

export default function Explorer() {
    const [isLocationsOpen, setLocationsOpen] = React.useState(true);
    const [files, setFiles] = React.useState<Dirent[]>([]);
    const [path, setPath] = React.useState('/');

    React.useEffect(() => {
        const kernel = InstanceBag.get<Kernel>('kernel');
        const { wasmFs } = kernel.fs;

        const filesAndDirectories: any = wasmFs.fs.readdirSync(path, {
            encoding: 'utf8',
            withFileTypes: true,
        });

        setFiles(filesAndDirectories);
    }, [path]);

    function handleFileClick(file: Dirent) {
        // Directories should just navigate to the next page
        if (file.isDirectory()) {
            // We have to make the path pretty so we filter out all the empty spaces
            const splittedPath = path.split('/').filter(p => p);
            let newPath = `/${splittedPath.join('/')}/${file.name}`;

            // Double // are ugly so we remove them
            if (newPath.startsWith('//')) {
                newPath = newPath.slice(1);
            }

            setPath(newPath);
        }
    }

    function handleFolderUpButtonClick() {
        const splittedPath = path.split('/');
        splittedPath.pop();

        let newPath = splittedPath.join('/');

        // Prettify the title bar
        if (newPath === '') {
            newPath = '/';
        }

        setPath(newPath);
    }

    return (
        <>
            <AppHeader title={path} toolbar={
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
                <Dropzone currentPath={path} className={styles.files}>
                    {files.map((file) => {
                        if (file.isDirectory()) {
                            return <Folder path={path} key={file.name.toString()} folder={file} onClick={handleFileClick} />
                        } else if (file.isFile()) {
                            return <File path={path} key={file.name.toString()} file={file} onClick={handleFileClick} />
                        }
                    })}
                </Dropzone>
            </AppHeader>
        </>
    );
}
