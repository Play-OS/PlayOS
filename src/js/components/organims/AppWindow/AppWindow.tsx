import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Process, AppProcessesState, setHeighestZIndex } from '../../../store/AppProcessesStore';
import { Rnd } from 'react-rnd';
import useMedia from '../../../services/hooks/useMedia';
import AppTitleBar from './AppTitleBar';
import resolveUrl from '../../../services/micro/resolveUrl';
import AppTerminal from '../AppTerminal';
const styles = require('./AppWindow.scss');
const titleBarStyles = require('./AppTitleBar.scss');

interface Props {
    process: Process;
    appProcessesState: AppProcessesState;
    dispatch: Function;
}

function AppWindow(props: Props) {
    const { process } = props;
    const [snapState, setSnapState] = React.useState({
        half: false,
        full: false,
    });

    const isDesktop = useMedia('(min-width: 960px)');
    const [windowZIndex, setWindowZIndex] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);

    function handleOnDrag(event: MouseEvent, data: any) {
        // We are dragging the window so we have to make sure we are almost touching the edges
        // First check the right side if we are touching the bounds
        if (event.clientX > window.outerWidth) {
            setSnapState({
                full: false,
                half: true,
            });
        } else if (event.clientX < 0) {
            setSnapState({
                full: false,
                half: true,
            });
        } else if (event.clientY < 0) {
            setSnapState({
                full: true,
                half: false,
            });
        }
    }

    function handleDragStart() {
        handleWindowClick();
        setIsDragging(true);
    }

    function handleDragStop() {
        setIsDragging(false);
    }

    function handleWindowClick() {
        if (windowZIndex < props.appProcessesState.heighestZIndex) {
            const newHeighestZIndex = props.appProcessesState.heighestZIndex + 1;

            setWindowZIndex(newHeighestZIndex);
            props.dispatch(setHeighestZIndex(newHeighestZIndex));
        }
    }

    const windowClassNames = classnames(styles.window, {
        [styles.halfSnapped]: snapState.half,
        [styles.fullSnapped]: snapState.full,
    });

    const rndClassNames = classnames(styles.rnd, {
        [styles.rndMobile]: !isDesktop,
    });

    const appBodyClassNames = classnames(styles.appBody, {
        [styles.dragging]: isDragging,
    });

    const mainUrl = resolveUrl(props.process.app.manifest_url, props.process.app.start_url);

    return (
        <Rnd
            default={{
                x: 0,
                y: 50,
                width: 320,
                height: 200,
            }}
            minWidth={300}
            minHeight={300}
            dragHandleClassName={titleBarStyles.appBar}
            bounds='parent'
            className={rndClassNames}
            style={{ zIndex: windowZIndex }}
            onDragStart={handleDragStart}
            onDragStop={handleDragStop}
            disableDragging={!isDesktop}
            enableResizing={{
                bottom: isDesktop,
                bottomLeft: isDesktop,
                bottomRight: isDesktop,
                left: isDesktop,
                right: isDesktop,
                top: isDesktop,
                topLeft: isDesktop,
                topRight: isDesktop,
            }}
        >
            <div className={windowClassNames} onClick={handleWindowClick} style={{ backgroundColor: props.process.app.background_color }}>
                <AppTitleBar process={props.process} />
                <div className={appBodyClassNames}>
                    {process.app.playos.isWasm &&
                        <>
                            <AppTerminal />
                        </>
                    }

                    {!process.app.playos.isWasm &&
                        <>
                            <iframe src={mainUrl} className={styles.iframe} onFocus={() => console.log('Iframe')}>
                                Content could not be loaded
                            </iframe>
                        </>
                    }
                </div>
            </div>
        </Rnd>
    );
}

const mapStateToProps = (state: any) => {
    return {
        appProcessesState: state.AppProcessesStore,
    }
}

// @ts-ignore
export default connect(mapStateToProps)(AppWindow);
