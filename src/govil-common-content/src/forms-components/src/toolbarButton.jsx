import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';

const styles = theme => {

}

@withStyles(styles)
class ToolbarButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, className, onMouseOverEvent, onMouseOutEvent, buttonText, visible, buttonAction } = this.props;

        return (
            <ListItem button onMouseOver={() => { onMouseOverEvent() }} onMouseOut={() => { onMouseOutEvent() }} visible={visible} onClick={buttonAction}>
                <ListItemIcon>
                    <Icon className={classes[className]}></Icon>
                </ListItemIcon>
                <ListItemText primary={buttonText} />
            </ListItem>
        );
    }
}

export default ToolbarButton;