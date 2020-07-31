import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { Process, killProcess } from '../../../store/AppProcessesStore';
import getIdealTextColor from '../../../services/micro/getIdealTextColor';
import useMedia from '../../../services/hooks/useMedia';
import Time from '../../atoms/Time';
const styles = require('./AppTitleBar.module.scss');

interface Props {
    process: Process;
    dispatch: Function;
}

function AppTitleBar(props: Props) {
    function handleCloseClick() {
        props.dispatch(killProcess(props.process.id));
    }

    const textColor = getIdealTextColor(props.process.app.theme_color);

    return (
        <header className={styles['app-title-bar']} style={{ backgroundColor: props.process.app.theme_color }}>
            <div className={styles.placeholder}></div>
            <span style={{ color: textColor }}>{props.process.app.short_name}</span>
            <IconButton aria-label="Close" onClick={handleCloseClick} style={{ color: textColor }}>
                <CloseIcon />
            </IconButton>
        </header>
    );
}

const mapStateToProps = (store: any) => {
    return {
        a: 1,
    }
}

// @ts-ignore
export default connect(mapStateToProps)(AppTitleBar);
