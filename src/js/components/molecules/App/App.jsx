import React from 'react';
import { connect } from 'react-redux';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Typography from '@material-ui/core/Typography';
import { confirm } from 'material-ui-dialogs';
import Configuration from '../../../Configuration';
import AppUninstallDialog from '../../molecules/AppUninstallDialog';
import AppService from '../../../services/AppService';
import styles from './App.scss';
import { openApp } from '../../../store/AppCanvasStore';

const popoverStyle = {
    textAlign: 'center',
    borderRadius: '10px',
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleAppClick = this.handleAppClick.bind(this);
        this.handleAppPress = this.handleAppPress.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
        this.handleUninstallClick = this.handleUninstallClick.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleContextMenuRequest = this.handleContextMenuRequest.bind(this);

        this.wrapperElem = null;
        this.tappableElem = null;

        this.isAllowedToClosePopover = true;

        this.state = {
            showPopover: false,
            popoverAnchorElem: null,
            showUninstsallDialog: false,
        };
    }

    getAppIcon() {
        const defaultIcon = `${Configuration.get('host')}blobstorage/dev/images/link.svg`;

        if (!this.props.app.icon) return defaultIcon;
        if (!this.props.app.icon.startsWith('http')) return defaultIcon;

        return this.props.app.icon || defaultIcon;
    }

    async handleAppClick() {
        // Context menu for some reaseon triggers a click
        // To prevent this we see if showPopover is true and don't trigger a open.
        if (this.state.showPopover) return;

        const isAppSupportedByDevice = AppService.isDeviceSupported(this.props.app.supportedDeviceTypes);

        if (!isAppSupportedByDevice) {
            const userWantsToOpen = await confirm('Not supported', 'This device is not supported by the app. You could run into issues by running it, are you sure?');

            if (!userWantsToOpen) return;
        }

        this.props.dispatch(openApp(this.props.app));
    }

    handlePopoverClose() {
        if (!this.hasContextMenu && !this.isAllowedToClosePopover) return;

        this.setState({
            showPopover: false,
        });
    }

    handleAppPress(event) {
        event.preventDefault();

        this.isAllowedToClosePopover = false;

        // Todo check if it's possible to remove..
        this.setState({
            showPopover: true,
            popoverAnchorElem: this.wrapperElem,
        });
    }

    handleUninstallClick() {
        this.setState({
            showPopover: false,
            showUninstsallDialog: true,
        });
    }

    handleDialogClose() {
        this.setState({
            showUninstsallDialog: false,
            showPopover: false,
        });
    }

    handleContextMenuRequest(event) {
        this.hasContextMenu = true;
        event.stopPropagation();
        event.preventDefault();

        this.setState({
            showPopover: true,
            popoverAnchorElem: this.wrapperElem,
        });
    }

    handleTouchEnd() {
        // Prevents an accidental close after long pressing.
        setTimeout(() => {
            this.isAllowedToClosePopover = true;
        }, 300);
    }

    render() {
        return (
            <div className="col-3-sm" onTouchEnd={this.handleTouchEnd} onContextMenu={this.handleContextMenuRequest} ref={(elem) => { this.wrapperElem = elem; }}>
                <AppUninstallDialog app={this.props.app} onRequestClose={this.handleDialogClose} isOpen={this.state.showUninstsallDialog} />
                <div ref={(tappable) => { this.tappableElem = tappable; }} className="App" component="div" onClick={this.handleAppClick}>
                    <div className="App-Icon">
                        <img alt={this.props.app.title} src={this.getAppIcon()} />
                    </div>
                    <span className="App-Title">
                        <Typography noWrap variant="body1">{this.props.app.title}</Typography>
                    </span>
                    <Popover
                        open={this.state.showPopover}
                        anchorEl={this.state.popoverAnchorElem}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                        onRequestClose={this.handlePopoverClose}
                        style={popoverStyle}
                    >
                        <Menu>
                            <MenuItem primaryText="Uninstall" onTouchTap={this.handleUninstallClick} />
                        </Menu>
                    </Popover>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        AppCanvasStore: store.AppCanvasStore,
    };
};

export default connect(mapStateToProps)(App);
