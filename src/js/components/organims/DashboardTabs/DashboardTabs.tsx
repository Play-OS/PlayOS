import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppSection from '../AppSection';
import Wallet from '../../molecules/Wallet';
const styles = require('./DashboardTabs.scss');

interface Props {

}

function DashboardTabs(props: Props) {
    return (
        <>
            <AppSection />
        </>
    );
}

export default DashboardTabs;
