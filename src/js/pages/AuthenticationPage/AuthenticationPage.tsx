import React, { ReactElement } from 'react';
import ConnectedAuthentication from '../../connectors/ConnectedAuthentication/ConnectedAuthentication';
import BackgroundCardWithLogo from '../../compositions/BackgroundCardWithLogo/BackgroundCardWithLogo';


export default function AuthenticationPage(): ReactElement {
    return (
        <BackgroundCardWithLogo includeLogo={false}>
            <ConnectedAuthentication />
        </BackgroundCardWithLogo>
    );
}
