import * as React from 'react';
import Button from '@material-ui/core/Button';

const styles = require('./ChoosePage.scss');

function ChoosePage() {
    return (
        <div className="ChoosePage">
            <Button href="#register" color="primary" variant="contained" className={styles.button} fullWidth>
                Create a new id
            </Button>
            <Button href="#login" className={styles.button} fullWidth>
                Sign in with an existing id
            </Button>
        </div>
    );
}

export default ChoosePage;
