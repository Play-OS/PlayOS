import * as React from 'react';
import { AppGrid } from '../../../services/micro/sortAppsInGrids';
import App from '../new/App';
const styles = require('./AppGrid.module.scss');

interface Props {
    grid: AppGrid;
}

export default function ApplicationGrid(props: Props) {

    return (
        <div className={styles.AppGrid}>
            {props.grid.apps.map((app) => {
                return <App key={app.manifest.id} app={app} />
            })}
        </div>
    );
}
