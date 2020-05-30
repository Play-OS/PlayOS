import React, { ReactElement } from 'react';
import ConnectedAuthentication from '../../connectors/ConnectedAuthentication/ConnectedAuthentication';


export default function AuthenticationPage(): ReactElement {
    return (
        <div>
            <ConnectedAuthentication />
        </div>
    );
}
