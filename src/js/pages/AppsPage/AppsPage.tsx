import React, { ReactElement } from 'react';
import ConnectedNavigation from '../../connectors/ConnectedNavigation/ConnectedNavigation';
import Page from '../../components/Page/Page';
import ConnectedApps from '../../connectors/ConnectedApps/ConnectedApps';
import trans from '../../lang/trans';


export default function AppsPage(): ReactElement {
    return (
        <ConnectedApps />
    );
}
