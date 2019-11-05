import * as React from 'react';
import AppHeader from '../../components/molecules/AppHeader/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import BrushIcon from '@material-ui/icons/Brush';
import WorkIcon from '@material-ui/icons/Work';
import BuildIcon from '@material-ui/icons/Build';
import CategoryIcon from '@material-ui/icons/Category';

function Store() {
    return (
        <div>
            <AppHeader
                title="Store"
                headerBackground="#6AE894"
                headerTextColor="#000"
                menu={
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>
                            <ListItemText primary="Discover" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <SportsEsportsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Games" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <BrushIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <WorkIcon />
                            </ListItemIcon>
                            <ListItemText primary="Work" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <BuildIcon />
                            </ListItemIcon>
                            <ListItemText primary="Develop" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItem>
                    </List>
                }
            >
                <div>
                    App store
                </div>
            </AppHeader>
        </div>
    );
}

export default Store;
