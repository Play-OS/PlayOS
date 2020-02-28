import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
const styles = require('./FileHeader.module.scss');

export default function FileHeader() {
    return (
        <AppBar position="static" className={styles.appBar}>
            <Typography variant="h3" color="inherit">
                <Toolbar>
                    Files
                </Toolbar>
            </Typography>
        </AppBar>
    );
}
