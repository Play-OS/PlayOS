import React, { ReactElement } from 'react';
import App from '../../components/molecules/new/App';
import { ParsedApplicationInfo } from '../../../vendor/kernel/core/WasmParser';

import styles from './AppsContainer.module.scss';
import FullscreenLoader from '../../compositions/FullscreenLoader/FullscreenLoader';

interface Props {
    apps: ParsedApplicationInfo[];
    loading: boolean;
}

export default function AppsContainer({
    apps,
    loading,
}: Props): ReactElement {
    return (
        <section className={styles.wrapper}>
            {loading && <FullscreenLoader />}

            {!loading && (
                <div className={styles.apps}>
                    {apps.map(app => (<App key={app.manifest.id} app={app} />))}
                </div>
            )}
        </section>
    );
}
