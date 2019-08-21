import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

interface Props {

}

function Wallet(props: Props) {
    return (
        <>
            <Dialog open={false}>
                <DialogTitle>
                    Requesting to sign message:
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Message
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary">
                        Cancel
                    </Button>
                    <Button color="primary" autoFocus>
                        Sign
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Wallet;
