import * as React from 'react';
import Terminal from 'terminal-in-react';
const styles = require('./AppTerminal.scss');

interface Props {

}

function AppTerminal(props: Props) {
    return (
        <div className={styles.appTerminal}>
            <Terminal
                hideTopBar
                allowTabs={false}
                color={'white'}
                startState={'maximised'}
                msg={`

                PlayOS Terminal v1.0`}
            />
        </div>
    );
}

export default AppTerminal;
