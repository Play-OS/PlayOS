import * as React from 'react';
import Button from '@material-ui/core/Button';
import ButtonLink from '../../components/atoms/ButtonLink';

const styles = require('./ChoosePage.module.scss');

function ChoosePage() {
    return (
        <div className="ChoosePage">
            <ButtonLink href="#/os/register" variant="contained">
                Create a new id
            </ButtonLink>
            <Button href="#/os/login" className={styles.button} fullWidth>
                Sign in with an existing id
            </Button>
        </div>
    );
}

export default ChoosePage;
