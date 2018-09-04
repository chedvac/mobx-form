import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from '../../../../node_modules/@material-ui/core';

const styles = theme => {

}

@withStyles(styles)
class ToolbarButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, onMouseOverEvent, onMouseOutEvent, iconClass, buttonText } = this.props;

        return (
            <ListItem button onMouseOver={() => { onMouseOverEvent() }} onMouseOut={() => { onMouseOutEvent() }}>
                <ListItemIcon>
                    <Icon className={classes[iconClass]}></Icon>
                </ListItemIcon>
                <ListItemText primary={buttonText} />
            </ListItem>
        );
    }
}

export default ToolbarButton;