import React from 'react';
import { connect } from 'react-redux';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import InstanceBag from '../../../InstanceBag';

class BackButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.eventHandler = InstanceBag.get('eventHandler');
    }

    sdk = null;

    state = {
        /** @type {string[]} */
        connectedNamespaces: [],
    }

    componentDidMount() {
        // this.sdk = InstanceBag.get('manager');
        // this.sdk.on('Message:os.connect', this.onAppConnected.bind(this));
    }

    onAppConnected(frameMessageEvent) {
        const { connectedNamespaces } = this.state;

        connectedNamespaces.push(frameMessageEvent.data.from);

        this.setState({
            connectedNamespaces,
        });
    }

    getBackButton() {
        const { currentlyOpen } = this.props.AppCanvasStore;

        // Application is not connected with SDK so it does not support the History from the SDK.
        if (!this.state.connectedNamespaces.includes(currentlyOpen.namespace)) {
            return null;
        }

        const themeColor = this.props.AppCanvasStore.currentlyOpenSettings.theme_color;

        return (
            <span className="BackButton" style={{ backgroundColor: themeColor }}>
                <BackIcon onClick={this.handleBackButtonClick} />
            </span>
        );
    }

    handleBackButtonClick() {
        if (!this.props.AppCanvasStore.currentlyOpen.id) return;

        this.eventHandler.trigger('os:goBack', {
            app: this.props.AppCanvasStore.currentlyOpen,
        });
    }

    render() {
        return this.getBackButton();
    }
}

const mapStateToProps = (store) => {
    return {
        AppCanvasStore: store.AppCanvasStore,
        NavigationBarStore: store.NavigationBarStore,
    };
};

export default connect(mapStateToProps)(BackButton);
