import * as React from 'react';
import { connect } from 'react-redux';
import LoginLoadingScreen from './LoginLoadingScreen/LoginLoadingScreen';
import { UserInfo, loadUserInfo } from '../../store/UserInfoStore';
import KeyService from '../../services/KeyService';
import Header from '../../components/molecules/Header';
import AppSection from '../../components/organims/AppSection';
import { loadApps } from '../../store/applications/applicationsActions';
import AppProcessesHolder from '../../components/organims/AppProcessesHolder';
import bootSystem from '../../services/bootSystem';
import redirect from '../../services/redirect';
import Application from '../../models/Application';

interface Props {
    user: UserInfo;
    applications: Application[];
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

        if (!keys) {
            redirect('/os/choose');
            return;
        }

        await bootSystem(keys);

        if (!this.props.user.info.fullName && keys) {
            this.props.dispatch(loadUserInfo(keys));
            this.props.dispatch(loadApps());
        }
    }

    static getDerivedStateFromProps(props: Props, state: State): State {
        if (props.user.info.fullName && props.applications.length) {
            return {
                ...state,
                isLoaded: true,
            };
        }

        return state;
    }

    render() {
        return (
            <>
                {!this.state.isLoaded
                    && <LoginLoadingScreen />}
                {this.state.isLoaded
                    && (
                        <>
                            <Header />
                            <AppSection />
                            <AppProcessesHolder />
                        </>
                    )}
            </>
        );
    }
}

const mapStateToProps = (store: any) => ({
    user: store.UserInfoStore,
    applications: store.ApplicationStore.apps,
});

// @ts-ignore
export default connect(mapStateToProps)(HomePage);
