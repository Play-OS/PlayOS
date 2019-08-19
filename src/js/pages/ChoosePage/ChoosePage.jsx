import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Configuration from '../../Configuration';

export default class ChoosePage extends React.Component {
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleRegister() {

    }

    handleLogin() {
        window.location.href = `${Configuration.get('domain')}#/login`;
    }

    render() {
        return (
            <div className="ChoosePage">
                <RaisedButton onClick={this.handleRegister} className="ChoosePage-Button" primary label="Create a new id" />
                <FlatButton onClick={this.handleLogin} className="ChoosePage-Button" label="Sign in with an existing id" />
            </div>
        );
    }
}
