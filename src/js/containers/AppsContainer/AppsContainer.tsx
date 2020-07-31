import React, { ReactElement } from 'react';
import SwipeableViews from 'react-swipeable-views';

import AppGrid from '../../components/molecules/AppGrid';
import useMedia from '../../services/hooks/useMedia';
import sortAppsInGrids from '../../services/micro/sortAppsInGrids';
import BulletNavigation from '../../components/atoms/BulletNavigation';

import styles from './AppsContainer.module.scss';

interface Props {
    apps: any;
    loading: boolean;
}

export default function AppsContainer({
    apps,
}: Props): ReactElement {
    const isDesktop = useMedia('(min-width: 960px)');
    const [viewIndex, setViewIndex] = React.useState(0);

    let amountPerGrid = 20;

    if (isDesktop) {
        amountPerGrid = 28;
    }

    const appGrids = sortAppsInGrids(apps, amountPerGrid);

    function handleChangeIndex(index: number) {
        setViewIndex(index);
    }

    return (
        <>
            <div className={styles.appContainer}>
                <div className={styles.wrapper}>
                    <SwipeableViews enableMouseEvents resistance onChangeIndex={handleChangeIndex} index={viewIndex}>
                        {appGrids.map((appGrid) => <AppGrid grid={appGrid} key={appGrid.id} />)}
                    </SwipeableViews>
                    <BulletNavigation amount={appGrids.length} activeIndex={viewIndex} onClick={handleChangeIndex} />
                </div>
            </div>
        </>
    );
}
