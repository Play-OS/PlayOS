import * as React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Process, AppProcessesState, setHeighestZIndex } from '../../../store/AppProcessesStore';
import { Rnd } from 'react-rnd';
const styles = require('./AppWindow.scss');

interface Props {
    process: Process;
    appProcessesState: AppProcessesState;
    dispatch: Function;
}

function AppWindow(props: Props) {
    const [snapState, setSnapState] = React.useState({
        half: false,
        full: false,
    });

    const [windowZIndex, setWindowZIndex] = React.useState(0);

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

    function handleWindowMouseDown() {
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
            dragHandleClassName={styles.appBar}
            bounds='parent'
            className={styles.rnd}
            style={{ zIndex: windowZIndex }}
            onDragStart={handleWindowMouseDown}
        >
            <div className={windowClassNames} onClick={handleWindowMouseDown}>
                <header className={styles.appBar}>
                    <span>{props.process.app.title}</span>
                </header>
                <div className={styles.appBody}>
                    {/* My new app */}
                    <iframe src={props.process.app.main} className={styles.iframe}>
                        Content could not be loaded
                    </iframe>
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
