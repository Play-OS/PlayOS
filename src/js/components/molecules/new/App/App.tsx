import * as React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import InstanceBag from '../../../../InstanceBag';
import BackgroundTerminal from '../../../../background/BackgroundTerminal';
import { ParsedApplicationInfo } from '../../../../../vendor/kernel/core/WasmParser';
const styles = require('./App.module.scss');

interface Props {
    app: ParsedApplicationInfo;
    dispatch: Function;
}

function App(props: Props) {
    const { app } = props;

    function handleAppClick() {
        const terminal = InstanceBag.get<BackgroundTerminal>('terminal');
        terminal.runCommand(`open ${app.location}`);
    }

    const icon = URL.createObjectURL(app.icon);

    return (
        <button className={styles.App} onClick={handleAppClick}>
            <img alt={app.manifest.name} src={icon} className={styles.icon} />
            <Typography noWrap variant="body1" className={styles.title}>{app.manifest.short_name}</Typography>
        </button>
    );
}

// @ts-ignore
export default connect(null)(App);
