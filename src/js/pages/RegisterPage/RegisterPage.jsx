import React from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import SnackBarMessageActions from '../../actions/SnackBarMessageActions';
import Configuration from '../../Configuration';
import styles from './RegisterPage.scss'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.emailInput = null;
        this.passwordInput = null;
        this.passwordAgainInput = null;
        this.nameInput = null;

        this.state = {
            errors: [],
            privacyPolicyChecked: false,
        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handlePrivacyCheckboxChange = this.handlePrivacyCheckboxChange.bind(this);
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        const email = this.emailInput.value;
        const password = this.passwordInput.value;
        const passwordAgain = this.passwordAgainInput.value;
        const name = this.nameInput.value;
        const redirectUri = decodeURIComponent(this.props.location.query.redirectUri);

        this.setState({
            errors: [],
        });

        this.props.dispatch(SnackBarMessageActions.setMessage('Registering..'));

        // First check the passwords.
        if (passwordAgain !== password) {
            this.setState({
                errors: [
                    'Both passwords should be the same',
                ],
            });
            this.props.dispatch(SnackBarMessageActions.setMessage('Validation error', 5000));
            return;
        }

        const registerInfo =  {}; // await UserServices.register(name, email, password);

        if (!registerInfo.ok) {
            if (registerInfo.message) {
                this.setState({
                    errors: [registerInfo.message],
                });

                this.props.dispatch(SnackBarMessageActions.setMessage('Validation error', 5000));
            } else {
                this.props.dispatch(SnackBarMessageActions.setMessage('Something went wrong on the server', 5000));
            }
        } else {
            // Registration is complete.
            // We cannot auto login annymore since we have to fill in a code now.

            // await UserServices.login(email, password);
            this.props.dispatch(SnackBarMessageActions.setMessage('Register complete!'));

            // The rest will be handeld by the login page.
            if (redirectUri) {
                window.location.href = `${Configuration.get('domain')}#/login?redirectUri=${encodeURIComponent(redirectUri)}`;
                return;
            }

            window.location.href = `${Configuration.get('domain')}#/login`;
        }
    }

    handleLoginClick() {
        const redirectUri = decodeURIComponent(this.props.location.query.redirectUri);

        if (redirectUri && redirectUri !== 'undefined') {
            window.location.href = Configuration.get('domain') + '#/login?redirectUri=' + encodeURIComponent(redirectUri);
        } else {
            window.location.href = Configuration.get('domain') + '#/login';
        }
    }

    handlePrivacyCheckboxChange(event, isInputChecked) {
        this.setState({
            privacyPolicyChecked: isInputChecked,
        });
    }

    render() {
        const PRIVACY_POLICY_URL = `${Configuration.get('host')}legal/privacypolicy`;
        const TERMS_OF_USE_URL = `${Configuration.get('host')}legal/termsofuse`;

        return (
            <div className="IndexPage">
                <form className="IndexPage-Form" onSubmit={this.handleFormSubmit}>
                    <span className="IndexPage-Form-Error">
                        {this.state.errors.map(error => <span key={Math.random()}>{error}</span>)}
                    </span>
                    <input type="text" required placeholder="Full name" ref={(elem) => { this.nameInput = elem; }} className="IndexPage-Form-Input" />
                    <input type="email" required placeholder="Email" ref={(elem) => { this.emailInput = elem; }} className="IndexPage-Form-Input" />
                    <input type="password" required placeholder="Password" ref={(elem) => { this.passwordInput = elem; }} className="IndexPage-Form-Input" />
                    <input type="password" required placeholder="Password again" ref={(elem) => { this.passwordAgainInput = elem; }} className="IndexPage-Form-Input" />
                    <div className={styles.privacyPolicyWrapper}>
                        <Checkbox onCheck={this.handlePrivacyCheckboxChange} className={styles.privacyPolicyCheckbox} />
                        <span>I agree to {'PlayOS\'s'} <a href={TERMS_OF_USE_URL}>Terms of Use</a> and <a href={PRIVACY_POLICY_URL}>Privacy Policy</a></span>
                    </div>
                    <RaisedButton disabled={!this.state.privacyPolicyChecked} type="submit" primary className="IndexPage-Form-Register" label="Register" fullWidth />
                </form>
                <a className="IndexPage-SwitchPage" onClick={this.handleLoginClick}>{"Already have an account? Login!"}</a>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        SnackBarMessageStore: store.SnackBarMessageStore,
    };
};

export default connect(mapStateToProps)(RegisterPage);
