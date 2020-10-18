import React, { ReactElement } from 'react';
import ConnectedAuthenticationPrompt from '../../connectors/ConnectedAuthenticationPrompt';


export default function AuthenticationPage(): ReactElement {
    return (
        <main>
            <ConnectedAuthenticationPrompt />
        </main>
    );
}
