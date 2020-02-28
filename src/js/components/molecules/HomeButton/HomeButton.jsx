import React from 'react';
import { connect } from 'react-redux';
// import Configuration from '../Configuration';
// import HomeIcon from 'material-ui/svg-icons/action/home';
// import { white } from 'material-ui/styles/colors';
import { closeApp } from '../../../store/AppProcessesStore';
import InstanceBag from '../../../InstanceBag';
const styles = require('./HomeButton.module.scss');

class HomeButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
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

    handleHomeButtonClick() {
        if (!this.props.AppCanvasStore.currentlyOpen.id) return;
        this.props.dispatch(closeApp());
    }

    handleHomePress() {
        console.log('Multitasking activated');
    }

    render() {
        const { currentlyOpen } = this.props.AppCanvasStore;

        // Application is not connected with SDK so it does not support the History from the SDK.
        if (this.state.connectedNamespaces.includes(currentlyOpen.namespace)) {
            return null;
        }

        return (
            <div title="Home" className={styles.HomeButton} onClick={this.handleHomeButtonClick}>
                {/* <HomeIcon color={white} /> */}
                <img alt="Home" src="./res/img/PlayOSLogoSide_white.svg" className={styles['HomeButton-Icon']} />
                {/* <button className="Clickable" onClick={this.handleHomeButtonClick}>Home</button> */}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        AppCanvasStore: store.AppCanvasStore,
    };
};

export default connect(mapStateToProps)(HomeButton);
