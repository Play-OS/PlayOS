import * as React from 'react';
import { connect } from 'react-redux';
import LoginLoadingScreen from './LoginLoadingScreen/LoginLoadingScreen';
import { UserInfo, loadUserInfo } from '../../store/UserInfoStore';
import KeyService from '../../services/KeyService';
import Header from '../../components/molecules/Header';
import AppSection from '../../components/organims/AppSection';
import { loadApps } from '../../store/ApplicationStore';
import AppProcessesHolder from '../../components/organims/AppProcessesHolder';
import Kernel, { RutileProvider } from '../../kernel';
import InstanceBag from '../../InstanceBag';
import Configuration from '../../Configuration';
const styles = require('./HomePage.scss');

interface Props {
    user: UserInfo;
    dispatch: (func: any) => void;
}

interface State {
    isLoaded: boolean;
}

class HomePage extends React.Component<Props, State> {
    state: State = {
        isLoaded: false,
    };

    async componentDidMount() {
        const keys = KeyService.keysFromStorage();
        const rutileConfig = Configuration.get('providerDetails');
        const kernel = new Kernel(keys.privateKey, new RutileProvider(rutileConfig.httpHost, rutileConfig.chainId, rutileConfig.coreAddress));
        await kernel.boot();

        if (sessionStorage.getItem('username')) {
            await kernel.registry.set('username', sessionStorage.getItem('username'), false);
            sessionStorage.removeItem('username');
        }

        InstanceBag.set('kernel', kernel);

        if (!this.props.user.info.fullName && keys) {
            this.props.dispatch(loadUserInfo());
            this.props.dispatch(loadApps());
        }
    }

    static getDerivedStateFromProps(props: Props, state: State): State {
        if (props.user.info.fullName) {
            return {
                ...state,
                isLoaded: true,
            };
        }

        return state;
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.isLoaded &&
                    <LoginLoadingScreen />
                }
                {this.state.isLoaded &&
                    <>
                        <Header />
                        <AppSection />
                        <AppProcessesHolder />
                    </>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (store: any) => ({
    user: store.UserInfoStore,
});

//@ts-ignore
export default connect(mapStateToProps)(HomePage);
