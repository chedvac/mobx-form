import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import injectSheet from 'react-jss'
import { Icon } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
const styles = theme => {
  nested: {
    marginRight: theme.spacing.unit * 4;
  }
};

@injectSheet(styles)
class ToolbarButton extends React.Component {
  constructor(props) {
    super(props);
    this.listItemClickEvent = this.listItemClickEvent.bind(this);
  }
  state = {
    isOpen: false
  };
  listItemClickEvent() {
    if (this.props.Popup) {
      this.setState({ isOpen: !this.state.isOpen });
      // if(this.state.isOpen){
      //   ReactDOM.render(<Popup isOpen={this.state.isOpen} />,)
      // }
    }
    if (this.props.buttonAction) {
      this.props.buttonAction();
    }
  }
  render() {
    const {
      classes,
      className,
      buttonText,
      visible,
      Popup
    } = this.props;

    return (
      <div>
        <ListItem
          button
          visible={visible}
          onClick={this.listItemClickEvent}
        >
          <ListItemIcon>
            <Icon className={classes[className]} />
          </ListItemIcon>
          <ListItemText primary={buttonText} />
          {Popup ? (
            this.state.isOpen ? (
              <ExpandLess className={classes.nested} />
            ) : (
                <ExpandMore className={classes.nested} />
              )
          ) : (
              false
            )}
        </ListItem>
        {this.state.isOpen &&
          this.props.isToolbarOpened && <Popup isOpen={this.state.isOpen} />}
      </div>
    );
  }
}

export default ToolbarButton;