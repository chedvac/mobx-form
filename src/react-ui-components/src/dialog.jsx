import React from 'react';
import ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';

import Button from '@material-ui/core/Button';
import DialogMaterial from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import dialog from 'mobx-business-components/dialog';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  direction: {
    direction: theme.direction
  },
  closeIcon: {
    width: 50
  }
});
@injectSheet(styles)
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
      },
      close: {
        hebrew: 'סגירה',
        english: 'Close',
        arabic: 'اغلاق'
      }
    };
  }
  mergeButtonsTexts = buttonsTexts =>
    Object.assign({}, this.defaultButtonsTexts, buttonsTexts);

  render() {
    // const isOpen = this.props.isOpen;
    const {
      isOpen,
      title,
      content: Content,
      buttons,
      buttonsTexts,
      onClose,
      fullWidth,
      maxWidth
    } = this.props.settings;
    const texts = this.mergeButtonsTexts(buttonsTexts);
    const { classes } = this.props;

    return (
      <div ref={this.ref}>
        <DialogMaterial
          className={classes.direction}
          open={isOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          onClose={onClose}
        >
          <IconButton
            onClick={onClose}
            className={classes.closeIcon}
            aria-label={this.props.languageStore
              .resourcesProvider(texts.close)
              .get()}
          >
            <CloseIcon />
          </IconButton>
          {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
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
                    .resourcesProvider(texts[btn.type])
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
Dialog.wrappedComponent.propTypes = {
  languageStore: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,
  isOpen: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    title: PropTypes.any,
    content: PropTypes.any,
    buttons: PropTypes.object,
    buttonsTexts: PropTypes.object
  })
};
export default Dialog;
