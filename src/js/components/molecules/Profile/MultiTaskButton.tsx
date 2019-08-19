import * as React from 'react';
import { connect } from 'react-redux';
// import ViewCarouselIcon from 'material-ui/svg-icons/action/view-carousel';
import * as classnames from 'classnames';
import { setMultitaskOpen, MultitaskStoreState } from '../../../store/MultitaskStore';
import getIdealTextColor from '../../../services/micro/getIdealTextColor';

const ViewCarouselIcon = require('material-ui/svg-icons/action/view-carousel').default;
const styles = require('./MultiTaskButton.scss');

interface Props {
    className?: string,
    appCanvasStore: {
        currentlyOpenSettings: {
            theme_color?: string,
        },
        currentlyOpen: {
            id?: string,
        }
    },

    dispatch: Function,
    multitaskStore: MultitaskStoreState,
}


const mapStateToProps = (state: any) => ({
    appCanvasStore: state.AppCanvasStore,
    multitaskStore: state.MultitaskStore,
});

// @ts-ignore
@connect(mapStateToProps)
class MultiTaskButton extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        // Toggles between being open and closed
        const open:boolean = !this.props.multitaskStore.isOpen;

        this.props.dispatch(setMultitaskOpen(open));
    }

    render() : JSX.Element {
        const buttonClasses = classnames(this.props.className, styles.buttonWrapper);

        // TODO: Make sure all classes are applyed (Also mobile)
        // See Profile.jsx
        const themeColor = this.props.appCanvasStore.currentlyOpenSettings.theme_color;
        let textColor:string = '#ffffff';

        if (themeColor) {
            textColor = getIdealTextColor(themeColor);
        }

        return (
            <button onClick={this.handleButtonClick} className={buttonClasses} style={{ backgroundColor: themeColor }}>
                <ViewCarouselIcon color={textColor} />
            </button>
        );
    }
}

export default MultiTaskButton;
