import React, { ReactElement, useEffect } from 'react';
import KeyService from '../../services/KeyService';
import redirect from '../../services/redirect';

export default function ConnectedAuthentication(): ReactElement {

    useEffect(() => {
        const keys = KeyService.keysFromStorage();

        if (!keys) {
            redirect('/register');
            return;
        }
    }, []);

    return (
        <></>
    );
}
