import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import injectSheet from 'react-jss'
import { Icon } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  iconMargin: {
    [`margin${theme.direction === 'rtl' ? 'Right' : 'Left'}`]: theme.spacing.unit * 2,
    [`margin${theme.direction === 'rtl' ? 'Left' : 'Right'}`]: 0
  },
  listItem: {
    paddingRight: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit / 2
  }
});

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
          className={classes.listItem}
        >
          <ListItemIcon >
            <Icon className={`${className} ${classes.iconMargin}`} />
          </ListItemIcon>
          <ListItemText primary={buttonText} />
          {Popup ? (
            this.state.isOpen ? (
              <ExpandLess className={classes.iconMargin} />
            ) : (
                <ExpandMore className={classes.iconMargin} />
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