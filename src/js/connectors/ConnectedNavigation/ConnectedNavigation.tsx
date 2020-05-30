import React, { ReactElement, ReactNode, useEffect } from 'react';
import NavigationContainer from '../../containers/NavigationContainer/NavigationContainer';
import { Switch, Route, Redirect } from 'react-router';
import HomePage from '../../pages/HomePage/HomePage';
import MarketplacePage from '../../pages/MarketplacePage/MarketplacePage';
import AppsPage from '../../pages/AppsPage/AppsPage';
import FilesPage from '../../pages/FilesPage/FilesPage';
import { useDispatch } from 'react-redux';
import { bootKernelSystem } from '../../store/kernel/kernelActions';

interface Props {
    title: string;
    children?: ReactNode;
}

export default function ConnectedNavigation({
    title,
    children
}: Props): ReactElement {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(bootKernelSystem());
    }, []);

    return (
        <NavigationContainer title={title}>
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/marketplace" component={MarketplacePage} />
                <Route path="/apps" component={AppsPage} />
                <Route path="/files" component={FilesPage} />
                <Redirect to="/home" />
            </Switch>
        </NavigationContainer>
    );
}
