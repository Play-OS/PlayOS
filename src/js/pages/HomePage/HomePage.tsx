import * as React from 'react';
import { connect } from 'react-redux';
import LoginLoadingScreen from './LoginLoadingScreen/LoginLoadingScreen';
import { UserInfo, loadUserInfo } from '../../store/UserInfoStore';
import KeyService from '../../services/KeyService';
import Header from '../../components/molecules/Header';
import AppSection from '../../components/organims/AppSection';
import { loadApps } from '../../store/ApplicationStore';
import AppProcessesHolder from '../../components/organims/AppProcessesHolder';
import { bootup } from '../../services/BootService';
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
    }

    async componentDidMount() {
        const keys = KeyService.keysFromStorage();
        await bootup();

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
            }
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
