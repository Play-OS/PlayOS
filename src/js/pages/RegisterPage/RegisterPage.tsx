import React from 'react';
import ConnectedRegister from '../../connectors/ConnectedRegister/ConnectedRegister';
import BackgroundCardWithLogo from '../../compositions/BackgroundCardWithLogo/BackgroundCardWithLogo';

export default function RegisterPage() {
    return (
        <BackgroundCardWithLogo>
            <ConnectedRegister />
        </BackgroundCardWithLogo>
    );
}
