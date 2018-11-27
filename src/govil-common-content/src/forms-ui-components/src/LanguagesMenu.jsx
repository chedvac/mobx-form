import React from 'react';
import { inject } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
@inject('languageStore')
export default class LanguagesMenu extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  selectLanguage = language => {
    this.props.languageStore.set_language(language);
  };

  render() {
    return (
      <List component="div" disablePadding>
        {this.props.languageStore.availableLanguagesList.map((language, i) => {
          return (
            <ListItem
              key={i}
              className={'language-item'}
              button
              onClick={() => {
                this.selectLanguage(language.longName);
              }}
            >
              <ListItemText inset primary={language.text} />
            </ListItem>
          );
        })}
      </List>
    );
  }
}
