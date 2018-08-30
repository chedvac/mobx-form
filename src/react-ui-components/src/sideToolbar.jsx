import React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import ToolBarButton from './toolbarButton';

const styles = theme => {
    const drawerWidth = 240;
    const margin = theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';
    return {
        drawerClass: {
            width: drawerWidth,
            float: 'right'
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing.unit * 7,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing.unit * 9,
            },
        },
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing.unit * 3
        },
        content1: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        content1Shift: {
            [margin]: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        }
    }
};

@withStyles(styles)
@observer
class SideToolbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        debugger;
        const { classes, open, handleDrawerOpenByFocus, handleDrawerCloseByFocus, actionsList } = this.props;
        const direction = 'rtl'
        return (
            <div>
                <Drawer
                    className={classNames(classes.drawerClass)}
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
                    }}
                    open={open}
                >
                    <Divider />
                    {
                        actionsList.map((action, index) =>
                            <ToolBarButton
                                buttonAction={action}
                                icon={index}
                                open={open}
                                onMouseOverEvent={handleDrawerOpenByFocus}
                                onMouseOutEvent={handleDrawerCloseByFocus}
                            />
                        )
                    }
                </Drawer>
                <main
                    className={classes.content}
                    classes={{
                        paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
                    }}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default SideToolbar;