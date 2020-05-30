import React, { ReactElement } from 'react';
import Page from '../../components/Page/Page';
import ConnectedNavigation from '../../connectors/ConnectedNavigation/ConnectedNavigation';
import trans from '../../lang/trans';
import ConnectedFiles from '../../connectors/ConnectedFiles/ConnectedFiles';


export default function FilesPage(): ReactElement {
    return (
        <ConnectedFiles />
    );
}
