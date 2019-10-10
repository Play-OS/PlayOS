import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Configuration from '../../Configuration';
import KeyService from '../../services/KeyService';
import { loadUserInfo } from '../../store/UserInfoStore';
import AuthService from '../../services/AuthService';
const styles = require('./LoginPage.scss');

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.emailInput = null;
        this.passwordInput = null;
        this.isToggleChecked = false;

        this.email = null;
        this.password = null;
        this.code = null;

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        const key = KeyService.createRadomPrivateKey();
        console.log('[] key -> ', key);
    }

    state = {
        privateKey: '',
        isLoading: false,
    }

    async componentDidMount() {
        const isLoggedIn = await AuthService.isLoggedIn();

        if (isLoggedIn) {
            this.props.dispatch(loadUserInfo());
            window.location.href = Configuration.get('homeUrl');
        }
    }

    async handleFormSubmit(event) {
        event.preventDefault();

        if (!this.state.privateKey) {
            return;
        }

        const redirectUri = decodeURIComponent(this.props.location.query.redirectUri);
        const keys = KeyService.fromMnemonic(this.state.privateKey);

        // Login was succesfull! Let's redirect
        if (redirectUri && redirectUri !== 'undefined') {
            window.location.href = redirectUri;
            return;
        }

        KeyService.saveKeys(keys);
        this.props.dispatch(loadUserInfo());
        window.location.href = Configuration.get('homeUrl');
    }

    redirectSuccess() {
        const redirectUri = decodeURIComponent(this.props.location.query.redirectUri);

        // Login was succesfull! Let's redirect
        if (redirectUri && redirectUri !== 'undefined') {
            window.location.href = redirectUri;
            return;
        }

        window.location.href = Configuration.get('homeUrl');
    }

    handleChange(event) {
        this.setState({
            privateKey: event.target.value,
        });
    }

    handleRegisterClick() {
        const redirectUri = decodeURIComponent(this.props.location.query.redirectUri);

        if (redirectUri && redirectUri !== 'undefined') {
            window.location.href = `#/register?redirectUri=${encodeURIComponent(redirectUri)}`;
        } else {
            window.location.href = `#/register`;
        }
    }

    render() {
        return (
            <div className="IndexPage">
                <React.Fragment>
                    <form className={styles.form} onSubmit={this.handleFormSubmit}>
                        <TextField fullWidth label="Recovery phrase" required multiline onChange={this.handleChange} value={this.state.privateKey} className={styles.input} />
                        {/* <input type="email" multiline required placeholder="Recovery phrase" ref={(elem) => { this.emailInput = elem; }} className="IndexPage-Form-Input" /> */}
                        <Button type="submit" color="primary" variant="contained" fullWidth className={styles.button}>Login</Button>
                    </form>
                    <a className={styles.link} onClick={this.handleRegisterClick}>Don't have an account? Create one!</a>
                </React.Fragment>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    user: store.UserInfoStore,
    SnackBarMessageStore: store.SnackBarMessageStore,
});

export default connect(mapStateToProps)(IndexPage);
