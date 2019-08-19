import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import App from '../../molecules/App';
// import Folder from '../Folder';
const styles = require('./AppSection.styles.scss');

class AppSection extends React.Component {
    constructor(props) {
        super(props);

        this.test = 1;
    }

    render() {
        return (
            <React.Fragment>
                <Paper className={styles['AppSection-Wrapper']}>
                    <div className={styles.AppSection}>
                        <div className={styles['AppSection-Apps']}>
                            <Typography variant="h4">Apps</Typography>
                            <div className="row">
                                {this.props.ApplicationStore.apps.map((app) => {
                                    if (app.isFolder) {
                                        // return <Folder key={app.id} folder={app} />;
                                    }

                                    return <App key={app.id} app={app} />;
                                })}
                            </div>
                        </div>
                    </div>
                </Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        ApplicationStore: store.ApplicationStore,
    };
};

export default connect(mapStateToProps)(AppSection);
