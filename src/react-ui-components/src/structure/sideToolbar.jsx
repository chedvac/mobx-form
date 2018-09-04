import React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ToolBarButton from 'react-ui-components/buttons/toolbarButton';

const styles = theme => {
    const drawerWidth = 240;
    const margin = theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';
    return {
        drawerClass: {
            height: '100%',
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
        ic_validateForm: {
            '&:before': {
                content: '"\\70"'
            }
        },
        ic_submitForm: {
            '&:before': {
                content: '"\\6c"'
            }
        },
        ic_print: {
            '&:before': {
                content: '"\\7a"'
            }
        },
        ic_saveAsPDF: {
            '&:before': {
                content: '"\\79"'
            }
        },
        ic_attachments: {
            '&:before': {
                content: '"\\6a"'
            }
        },
        ic_save: {
            '&:before': {
                content: '"\\42"'
            }
        }
    }
};

const texts = {
    validateForm: 'בדוק תקינות',
    submitForm: 'שלח',
    print: 'הדפס',
    saveAsPDF: 'שמור כ PDF',
    attachments: 'צרופות',
    save: 'שמור'
}

@withStyles(styles)
@observer
class SideToolbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        debugger;
        const { classes, open, handleDrawerOpenByFocus, handleDrawerCloseByFocus, actionsList } = this.props;
        return (
            <Drawer
                className={classes.drawerClass}
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
                }}
                open={open}
            >
                <Divider />
                {
                    actionsList.map((action) =>
                        <ToolBarButton
                            classes={classes}
                            buttonText={texts[action]}
                            iconClass={`ic_${action}`}
                            buttonAction={action}
                            open={open}
                            onMouseOverEvent={handleDrawerOpenByFocus}
                            onMouseOutEvent={handleDrawerCloseByFocus}
                        />
                    )
                }
            </Drawer>
        );
    }
}

export default SideToolbar;