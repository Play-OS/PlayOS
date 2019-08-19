import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

class SnackBarMessage extends React.PureComponent {
    render() {
        const open = !!this.props.SnackBarMessageStore.message;

        return (
            <Snackbar
                open={open}
                message={this.props.SnackBarMessageStore.message}
                autoHideDuration={this.props.SnackBarMessageStore.autoHideDuration}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        SnackBarMessageStore: store.SnackBarMessageStore,
    };
};

export default connect(mapStateToProps)(SnackBarMessage);
