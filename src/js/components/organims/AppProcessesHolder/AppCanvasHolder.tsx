import * as React from 'react';
import { connect } from 'react-redux'
import { AppProcessesState } from '../../../store/AppProcessesStore';
import AppProcess from '../AppProcess/AppProcess';
const styles = require('./AppCanvasHolder.scss');

interface Props {
    appProcessesState: AppProcessesState;
}

function AppCanvasHolder(props: Props) {
    return (
        <div className={styles.processHolder}>
            {props.appProcessesState.processes.map((process) => {
                return <AppProcess key={process.id} process={process} />
            })}
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        appProcessesState: state.AppProcessesStore,
    };
}

export default connect(mapStateToProps)(AppCanvasHolder);
