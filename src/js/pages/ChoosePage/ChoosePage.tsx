import * as React from 'react';
import Button from '@material-ui/core/Button';

const styles = require('./ChoosePage.module.scss');

function ChoosePage() {
    return (
        <div className="ChoosePage">
            <Button href="#/os/register" color="primary" variant="contained" className={styles.button} fullWidth>
                Create a new id
            </Button>
            <Button href="#/os/login" className={styles.button} fullWidth>
                Sign in with an existing id
            </Button>
        </div>
    );
}

export default ChoosePage;
