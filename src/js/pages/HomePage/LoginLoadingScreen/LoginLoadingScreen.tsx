import * as React from 'react';
import classnames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { UserInfo } from '../../../store/UserInfoStore';
import logo from '../../../../../res/img/PlayOSLogoSide_black.svg';
const styles = require('./LoginLoadingScreen.scss');

interface Props {
    user: UserInfo,
}

interface State {

}

class LoginLoadingScreen extends React.Component<Props, State> {
    render() {
        const welcomeClassNames = classnames(styles.welcomeText, {
            [styles.welcomeTextShow]: !!this.props.user.info.fullName,
        });

        return (
            <section className={styles.defaultLayoutPanel}>
                <Paper elevation={5} className={styles.defaultLayoutPanelPaper}>
                    <div className={styles.defaultLayoutPanelMessage}>
                        <span className={styles.defaultLayoutPanelMessageLogo}>
                            <img src={logo} alt="Logo" />
                        </span>
                    </div>
                    <div className={styles.defaultLayoutPanelContent}>
                        <div className={styles.loadingWrapper}>
                            <Typography variant="body1" gutterBottom className={welcomeClassNames}>
                                Welcome {this.props.user.info.fullName}
                            </Typography>
                            <CircularProgress />
                        </div>
                    </div>
                </Paper>
            </section>
        );
    }
}

const mapStateToProps = (store: any) => ({
    user: store.UserInfoStore,
});

export default connect(mapStateToProps)(LoginLoadingScreen);
