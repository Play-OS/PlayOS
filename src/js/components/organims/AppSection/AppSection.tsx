import * as React from 'react';
import { connect } from 'react-redux';
import SwipeableViewsRaw from 'react-swipeable-views';
// @ts-ignore
import { bindKeyboard } from 'react-swipeable-views-utils';
import Application from '../../../models/Application';
import sortAppsInGrids from '../../../services/micro/sortAppsInGrids';
import AppGrid from '../../molecules/AppGrid';
import useMedia from '../../../services/hooks/useMedia';
import BulletNavigation from '../../atoms/BulletNavigation';
// import Folder from '../Folder';
const styles = require('./AppSection.styles.scss');
const SwipeableViews = bindKeyboard(SwipeableViewsRaw)

interface Props {
    apps: Application[];
}

function AppSection(props: Props) {
    const isDesktop = useMedia('(min-width: 960px)');
    const [viewIndex, setViewIndex] = React.useState(0);

    let amountPerGrid = 20;

    if (isDesktop) {
        amountPerGrid = 28;
    }

    const appGrids = sortAppsInGrids(props.apps, amountPerGrid);

    function handleChangeIndex(index: number) {
        setViewIndex(index);
    }

    return (
        <React.Fragment>
            <div className={styles.AppSection}>
                <div className={styles.wrapper}>
                    <SwipeableViews enableMouseEvents resistance onChangeIndex={handleChangeIndex} index={viewIndex}>
                        {appGrids.map((appGrid) => {
                            return <AppGrid grid={appGrid} key={appGrid.id} />
                        })}
                    </SwipeableViews>
                    <BulletNavigation amount={appGrids.length} activeIndex={viewIndex} onClick={handleChangeIndex} />
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (store: any) => {
    return {
        ApplicationStore: store.ApplicationStore,
        apps: store.ApplicationStore.apps,
    };
};

// @ts-ignore
export default connect(mapStateToProps)(AppSection);
