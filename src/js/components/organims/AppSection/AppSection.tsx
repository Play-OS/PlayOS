import * as React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import App from '../../molecules/App';
import Application from '../../../models/Application';
// import Folder from '../Folder';
const styles = require('./AppSection.styles.scss');

interface Props {
    apps: Application[];
}

function AppSection(props: Props) {
    return (
        <React.Fragment>
            <Paper className={styles['AppSection-Wrapper']}>
                <div className={styles.AppSection}>
                    <div className={styles['AppSection-Apps']}>
                        <Typography variant="h4" className={styles['AppSection-Title']}>My Apps</Typography>
                        <Grid container spacing={4}>
                            {props.apps.map((app) => {
                                if (app.isFolder) {
                                    // return <Folder key={app.id} folder={app} />;
                                }

                                return <App key={app.id} app={app} />;
                            })}
                        </Grid>
                    </div>
                </div>
            </Paper>
        </React.Fragment>
    );
}

const mapStateToProps = (store: any) => {
    console.log('[] store -> ', store);
    return {
        apps: store.ApplicationStore.apps,
    };
};

// @ts-ignore
export default connect(mapStateToProps)(AppSection);
