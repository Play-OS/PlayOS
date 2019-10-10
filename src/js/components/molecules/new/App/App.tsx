import * as React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Application from '../../../../models/Application';
import { openApp } from '../../../../store/AppProcessesStore';
const styles = require('./App.scss');

interface Props {
    app: Application;
    dispatch: Function;
}

function App(props: Props) {
    function handleAppClick() {
        props.dispatch(openApp(props.app));
    }

    return (
        <button className={styles.App} onClick={handleAppClick}>
            <img src={props.app.icon} className={styles.icon} />
            <Typography noWrap variant="body1" className={styles.title}>{props.app.title}</Typography>
        </button>
    );
}

// @ts-ignore
export default connect(null)(App);
