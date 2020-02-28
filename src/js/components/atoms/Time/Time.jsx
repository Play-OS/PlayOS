import React from 'react';

const styles = require('./Time.module.scss');

class Time extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeString: '10:10',
        };

        this.startClock();
    }

    formatWithZero(number) {
        let result = number;

        if (number < 10) result = '0' + result;

        return result;
    }

    startClock() {
        setInterval(() => {
            const now = new Date();
            const hour = this.formatWithZero(now.getHours());
            const minutes = this.formatWithZero(now.getMinutes());

            this.setState({
                timeString: `${hour}:${minutes}`,
            });
        }, 200);
    }

    render() {
        const className = this.props.className ? this.props.className : styles.Time;

        return (
            <div className={className} style={this.props.style}>
                {this.state.timeString}
            </div>
        );
    }
}

export default Time;
