import React from 'react';
import { observer, inject } from 'mobx-react';

import Button from '@material-ui/core/Button';
import DialogMaterial from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import dialog from './dialog';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  direction: {
    direction: theme.direction
  }
});
@withStyles(styles)
@inject('languageStore')
@observer
class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.defaultButtonsTexts = {
      ok: {
        hebrew: 'אישור',
        english: 'OK',
        arabic: 'التأكيد'
      },
      cancel: {
        hebrew: 'ביטול',
        english: 'Cancel',
        arabic: 'الغاء'
      }
    };
  }
  mergeButtonsTexts = buttonTexts =>
    Object.assign({}, this.defaultButtonsTexts, buttonTexts);

  render() {
    const isOpen = dialog.isOpen;
    const { title, content: Content, buttons, buttonsTexts } = dialog.settings;
    const texts = this.mergeButtonsTexts(buttonsTexts);
    const { classes } = this.props;

    return (
      <div>
        <DialogMaterial
          className={classes.direction}
          open={isOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            {typeof Content === 'string' ? (
              <DialogContentText id="alert-dialog-description">
                {Content}
              </DialogContentText>
            ) : (
              <Content />
            )}
          </DialogContent>
          {buttons && (
            <DialogActions>
              {Object.values(buttons).map((btn, index) => (
                <Button key={index} onClick={btn.click} color="primary">
                  {this.props.languageStore
                    .computedResourcesProvider(texts[btn.type])
                    .get()}
                </Button>
              ))}
            </DialogActions>
          )}
        </DialogMaterial>
      </div>
    );
  }
}
Dialog.propTypes = {
  languageStore: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired
};
export default Dialog;