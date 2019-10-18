import * as React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import useMedia from '../../../services/hooks/useMedia';
import { addApplication } from '../../../services/ApplicationService';
import { addSingleApplication } from '../../../store/ApplicationStore';

interface Props {
    open: boolean;
    onClose: () => void;
    dispatch: Function;
}

function AppInstallDialog(props: Props) {
    const [manifestTextFieldValue, setManifestTextFieldValue] = React.useState('');
    const isDesktop = useMedia('(min-width: 960px)');

    async function handleAppInstallClick() {
        const app = await addApplication(manifestTextFieldValue);
        props.dispatch(addSingleApplication(app));
    }

    function handleClose() {
        setManifestTextFieldValue('');
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={handleClose} fullScreen={!isDesktop}>
            <DialogTitle>Install app via Manifest</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can install Progressive Web Apps via the manifest.json. Please fill in the location of the manifest.
                </DialogContentText>
                <TextField
                    margin="dense"
                    fullWidth
                    label="Manifest.json"
                    value={manifestTextFieldValue}
                    onChange={(event) => setManifestTextFieldValue(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAppInstallClick} color="primary">Install</Button>
            </DialogActions>
        </Dialog>
    );
}

// @ts-ignore
export default connect()(AppInstallDialog);
