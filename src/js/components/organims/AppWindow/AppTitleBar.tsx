import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';
import { Process, killProcess, closeApp } from '../../../store/AppProcessesStore';
import getIdealTextColor from '../../../services/micro/getIdealTextColor';
import useMedia from '../../../services/hooks/useMedia';
import Time from '../../atoms/Time';
const styles = require('./AppTitleBar.scss');

interface Props {
    title: string;
    process: Process;
    dispatch: Function;
}

function AppTitleBar(props: Props) {
    const isDesktop = useMedia('(min-width: 960px)');

    function handleCloseClick() {
        props.dispatch(killProcess(props.process.id));
    }

    const textColor = getIdealTextColor(props.process.app.background_color);

    return (
        <header className={styles.appBar} style={{ backgroundColor: props.process.app.background_color }}>
            <IconButton aria-label="Back" style={{ color: textColor }}>
                <ArrowBackIcon />
            </IconButton>
            {isDesktop && <span style={{ color: textColor }}>{props.process.app.short_name}</span>}
            {!isDesktop && <Time style={{ color: textColor }} />}
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
