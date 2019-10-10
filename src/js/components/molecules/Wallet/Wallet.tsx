import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { UserInfo } from '../../../store/UserInfoStore';
const styles = require('./Wallet.scss');


interface Props {
    UserInfoStore: UserInfo;
}

function Wallet(props: Props) {
    return (
        <>
            <div className={styles.Wallet}>
                <Paper className={styles.wrapper}>
                    <Typography variant="h4">My Wallet</Typography>
                    <div>
                        <div>
                            <Typography>Balance</Typography>
                            <Typography>{props.UserInfoStore.info.address}</Typography>
                            <Typography>{props.UserInfoStore.info.balance} {props.UserInfoStore.info.currencyTicker}</Typography>
                        </div>
                    </div>
                </Paper>
            </div>
        </>
    );
}

const mapStateToProps = (props: any) => {
    return {
        UserInfoStore: props.UserInfoStore,
    }
}

export default connect(mapStateToProps)(Wallet);
