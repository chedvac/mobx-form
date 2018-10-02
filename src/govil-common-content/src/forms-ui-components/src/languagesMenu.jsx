import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { inject } from 'mobx-react';

@inject('applicationData')
export default class Languages extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  selectLanguage = language => {
    this.props.applicationData.formLanguage.set_language(language);
    this.handleClose();
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={true}
          onClose={this.handleClose}
        >
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
        </Menu>
      </div>
    );
  }
}
