import React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ToolbarButton from 'govil-common-content/forms-components/src/toolbarButton';
import toolbarButtons from './toolbarButtons'
import _ from 'lodash';

const styles = theme => {
    theme.drawerWidth = 240;
    //const margin = theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';

    return {
        // drawerClass: {
        //     height: '100%',
        //     // float: 'right'
        // },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: theme.drawerWidth,
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
            }
        },
        'ic-validateForm': {
            '&:before': {
                content: '"\\70"'
            }
        },
        'ic-submit': {
            '&:before': {
                content: '"\\6c"'
            }
        },
        'ic-print': {
            '&:before': {
                content: '"\\7a"'
            }
        },
        'ic-saveAsPDF': {
            '&:before': {
                content: '"\\79"'
            }
        },
        'ic-attachments': {
            '&:before': {
                content: '"\\6a"'
            }
        },
        'ic-save': {
            '&:before': {
                content: '"\\42"'
            }
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
        const { classes, opened, openToolbarOnOver, closeToolbarOnOut, toolbarButtonsStore } = this.props;
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !opened && classes.drawerPaperClose)
                }}
                opened={opened}
            >
                <Divider />
                {
                    Object.entries(toolbarButtons).map((toolbarButton) =>
                        toolbarButtonsStore.toolbarButtonsList[toolbarButton[0]] ? <ToolbarButton
                            classes={classes}
                            buttonText={toolbarButton[1].buttonText.hebrew}
                            className={toolbarButton[1].className}
                            buttonAction={toolbarButton[1].action}
                            onMouseOverEvent={openToolbarOnOver}
                            onMouseOutEvent={closeToolbarOnOut}
                        /> : ''
                    )
                }
            </Drawer>
        );
    }
}

export default SideToolbar;