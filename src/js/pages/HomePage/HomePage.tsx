import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import LoginLoadingScreen from './LoginLoadingScreen/LoginLoadingScreen';
import { UserInfo, loadUserInfo } from '../../store/UserInfoStore';
import KeyService from '../../services/KeyService';
import Header from '../../components/molecules/Header';
import AppSection from '../../components/organims/AppSection';
import { loadApps } from '../../store/ApplicationStore';
import Wallet from '../../components/molecules/Wallet';
import AppCanvasHolder from '../../components/organims/AppCanvasHolder';
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

    componentDidMount() {
        const keys = KeyService.keysFromStorage();

        if (!this.props.user.info.fullName && keys) {
            this.props.dispatch(loadUserInfo(keys));
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
                        {/* <AppCanvasHolder /> */}
                        <Wallet />
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
