import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { AppGrid } from '../../../services/micro/sortAppsInGrids';
import App from '../new/App';
const styles = require('./AppGrid.scss');

interface Props {
    grid: AppGrid;
}

export default function AppGrid(props: Props) {

    return (
        <div className={styles.AppGrid}>
            {props.grid.apps.map((app) => {
                return <App key={app.id} app={app} />
            })}
        </div>
    );
}
