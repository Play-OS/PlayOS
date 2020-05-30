import React, { ReactElement } from 'react';
import Page from '../../components/Page/Page';
import ConnectedNavigation from '../../connectors/ConnectedNavigation/ConnectedNavigation';
import trans from '../../lang/trans';


export default function MarketplacePage(): ReactElement {
    return (
        <Page>
            <ConnectedNavigation title={trans('titles.marketplace')}>
                Hello World
            </ConnectedNavigation>
        </Page>
    );
}
