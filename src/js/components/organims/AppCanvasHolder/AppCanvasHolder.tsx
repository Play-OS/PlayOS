import * as React from 'react';
import AppCanvas from '../../molecules/AppCanvas';
const styles = require('./AppCanvasHolder.scss');

interface Props {

}

function AppCanvasHolder(props: Props) {
    return (
        <div className={styles.appCanvasHolder}>
            <AppCanvas />
        </div>
    );
}

export default AppCanvasHolder;
