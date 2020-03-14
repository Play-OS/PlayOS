import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import UserService from '../../../services/UserService';
import SnackBarMessageActions from '../../../actions/SnackBarMessageActions';
import { setApps } from '../../../store/applications/applicationStore';

class AppUninstallDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleDeleteTap = this.handleDeleteTap.bind(this);
    }

    componentWillReceiveProps(props) {
        // Open state has changed
        if (props.isOpen !== this.state.open) {
            this.setState({
                open: props.isOpen,
            });
        }
    }

    async handleDeleteTap() {
        this.props.dispatch(SnackBarMessageActions.setMessage('Uninstalling app..'));
        const isUninstalled = await UserService.uninstallApp(this.props.app);

        if (isUninstalled) {
            const installedApps = await UserService.getInstalledApps();
            this.props.dispatch(setApps(installedApps));

            this.props.dispatch(SnackBarMessageActions.setMessage('App was uninstalled', 5000));

            // TODO: Refresh apps.
        } else {
            this.props.dispatch(SnackBarMessageActions.setMessage('Something went wrong..', 5000));
        }

        this.props.onRequestClose();
    }

    handleClose() {
        this.setState({ open: false });
        this.props.onRequestClose();
    }

    render() {
        let dialogTitle = 'You sure you want to delete this app?';
        let dialogMessage = `Deleting '${this.props.app.title}' will remove it from your homescreen.`;

        let actions = [];

        if (this.props.app.status !== 'STANDARD') {
            actions = [
                <FlatButton
                    label="Cancel"
                    primary={true}
                    onTouchTap={this.handleClose}
                />,
                <FlatButton
                    label="Delete"
                    secondary={true}
                    onTouchTap={this.handleDeleteTap}
                />,
            ];
        } else {
            actions = [
                <FlatButton
                    label="Ok"
                    primary
                    onTouchTap={this.handleClose}
                />,
            ];
            dialogTitle = 'Standard apps cannot be removed';
            dialogMessage = '';
        }

        return (
            <div className="AppUninstallDialog">
                <Dialog
                    title={dialogTitle}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    {dialogMessage}
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        SnackBarMessageStore: store.SnackBarMessageStore,
        ApplicationStore: store.ApplicationStore,
    };
};

export default connect(mapStateToProps)(AppUninstallDialog);
