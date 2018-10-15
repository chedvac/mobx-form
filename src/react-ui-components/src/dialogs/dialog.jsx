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
    this.buttonsTexts = {
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
  render() {
    const { isOpen, title, content: Content, buttons } = dialog.state;
    const { classes } = this.props;
    console.log('-------------------in jsx dialog.state', dialog.state);

    return (
      <div>
        <DialogMaterial
          className={classes.direction}
          open={isOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> {title}</DialogTitle>
          <DialogContent>
            {typeof Content === 'string' ? (
              <DialogContentText id="alert-dialog-description">
                {Content}
              </DialogContentText>
            ) : (
              <Content />
            )}
          </DialogContent>
          <DialogActions>
            {Object.values(buttons).map((btn, index) => (
              <Button key={index} onClick={btn.click} color="primary">
                {this.props.languageStore
                  .computedResourcesProvider(btn.text)
                  .get()}
              </Button>
            ))}
          </DialogActions>
        </DialogMaterial>
      </div>
    );
  }
}
Dialog.propTypes = {
  state: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired,
    isOpen: PropTypes.bool.isRequired,
    buttons: PropTypes.array.isRequired
  })
};
export default Dialog;
