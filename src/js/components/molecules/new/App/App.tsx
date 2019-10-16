import * as React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Application from '../../../../models/Application';
import { openApp } from '../../../../store/AppProcessesStore';
import resolveUrl from '../../../../services/micro/resolveUrl';
const styles = require('./App.scss');

interface Props {
    app: Application;
    dispatch: Function;
}

function App(props: Props) {
    function handleAppClick() {
        props.dispatch(openApp(props.app));
    }

    const highestResIcon = resolveUrl(props.app.manifest_url, props.app.icons[0].src);

    return (
        <button className={styles.App} onClick={handleAppClick}>
            <img src={highestResIcon} className={styles.icon} />
            <Typography noWrap variant="body1" className={styles.title}>{props.app.short_name}</Typography>
        </button>
    );
}

// @ts-ignore
export default connect(null)(App);
