import * as React from 'react';
import { Process } from '../../../store/AppProcessesStore';
import AppWindow from '../AppWindow';

interface Props {
    process: Process;
}

function AppProcess(props: Props) {
    // We still have to determine if the app should be in a window or
    // in the background and keep being ran

    return (
        <>
            <AppWindow process={props.process} />
        </>
    );
}

export default AppProcess;
