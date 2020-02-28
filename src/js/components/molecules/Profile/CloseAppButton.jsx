import React from 'react';
import { connect } from 'react-redux';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import styles from './CloseAppButton.module.scss';
import classnames from 'classnames';
import { closeApp } from '../../../store/AppProcessesStore';

class CloseAppButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    }

    handleCloseButtonClick() {
        if (!this.props.AppCanvasStore.currentlyOpen.id) return;
        this.props.dispatch(closeApp());
    }

    render() {
        const isAppOpen = !!this.props.AppCanvasStore.currentlyOpen.id;
        const buttonClasses = classnames(this.props.className, styles.CloseAppButton, {
            [styles.inactive]: !isAppOpen,
        });

        const themeColor = this.props.AppCanvasStore.currentlyOpenSettings.theme_color;

        return (
            <span className={buttonClasses} onClick={this.handleCloseButtonClick} style={{ backgroundColor: themeColor }}>
                <CloseIcon className={styles.Icon} />
            </span>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        AppCanvasStore: store.AppCanvasStore,
    };
};

export default connect(mapStateToProps)(CloseAppButton);

