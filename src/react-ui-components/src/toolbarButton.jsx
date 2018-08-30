import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
    ic_validateForm: {
        '&:before': {
            content: '"\\70"'
        }
    },
    ic_submitForm: {
        '&:before': {
            content: '"\\6c"'
        }
    }
});

const texts = {
    validateForm: 'בדיקת תקינות',
    submitForm: 'שליחת טופס'
}

const classesNames = {
    validateForm: 'ic-v',
    submitForm: 'ic-send'
}

@withStyles(styles)
class ToolbarButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, buttonAction, icon, onMouseOverEvent, onMouseOutEvent } = this.props;
        const iconClass = `ic_${buttonAction}`;
        return (
            <ListItem button onMouseOver={() => { onMouseOverEvent() }} onMouseOut={() => { onMouseOutEvent() }}>
                <ListItemIcon>
                    <i className={classNames(classes[iconClass])} >{icon}</i>
                </ListItemIcon>
                <ListItemText primary={texts[buttonAction]} />
            </ListItem>
        );
    }
}

export default ToolbarButton;