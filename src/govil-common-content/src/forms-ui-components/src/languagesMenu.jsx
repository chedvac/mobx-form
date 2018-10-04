import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import { inject } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
@inject('applicationData')
export default class Languages extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  selectLanguage = language => {
    this.props.applicationData.formLanguage.set_language(language);
  };

  render() {
    return (
      <Collapse in={this.props.isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {this.props.applicationData.formLanguage.availableLanguagesList.map(
            (language, i) => {
              return (
                <ListItem
                  button
                  // className={classes.nested}
                  onClick={() => {
                    this.selectLanguage(language.longName);
                  }}
                >
                  <ListItemText inset primary={language.text} />
                </ListItem>
              );
            }
          )}
        </List>
        {/* <Menu id="simple-menu" open={true} onClose={this.handleClose}>
        {this.props.applicationData.formLanguage.availableLanguagesList.map(
          (language, i) => {
            return (
              <MenuItem
                key={i}
                onClick={() => {
                  this.selectLanguage(language.longName);
                }}
              >
                {language.text}
              </MenuItem>
            );
          }
        )}
      </Menu> */}
      </Collapse>
    );
  }
}
