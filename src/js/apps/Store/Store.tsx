import * as React from 'react';
import AppHeader from '../../components/molecules/AppHeader/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function StoreApp() {
    return (
        <div>
            <AppHeader
                title="Store"
                menu={
                    <List>
                        <ListItem>
                            <ListItemText primary="Hello" />
                        </ListItem>
                    </List>
                }
            >
                Hello
            </AppHeader>
        </div>
    );
}

export default StoreApp;
