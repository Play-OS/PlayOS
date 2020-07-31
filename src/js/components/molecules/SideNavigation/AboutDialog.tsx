import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
const packageJson = require('../../../../../package.json');
const styles = require('./AboutDialog.module.scss');

interface Props {
    open: boolean;
    onClose: () => void;
}


export default function AboutDialog(props: Props) {
    return (
        <Dialog open={props.open} PaperProps={{ className: styles['about-dialog__paper'] }} onClose={() => props.onClose()}>
            <DialogTitle className={styles.title}>
                <img className={styles['about-dialog__logo']} src="./res/img/PlayOSLogoSide_black.svg" alt="PlayOS" />
                <span>Matterhorn</span>
            </DialogTitle>
            <DialogContent className={styles.content}>
                <DialogContentText className={styles['about-dialog__content-text']}>
                    <Typography variant="body2" className={styles.version}>v{packageJson.version}</Typography>
                    Licensed under GPL v3 <br />
                    Code available at GitHub
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose()}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}
