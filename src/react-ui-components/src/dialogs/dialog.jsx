import React from 'react';
import Button from '@material-ui/core/Button';
import DialogUi from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import dialog from './dialog';
import {observer} from 'mobx-react'

// @observer 
class Dialog extends React.Component {
    defaultTexts = {
        hebrew: {
            ok: 'אישור',
            cancel: 'ביטול'
        },
        arabic: {
            ok: 'التأكيد',
            cancel: 'الغاء'
        },
        english: {
            ok: 'OK',
            cancel: 'Cancel'
        }
    };
    state = dialog.state

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const state1 = {...this.state};
    return (
      <div>
        <DialogUi
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> {this.state.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              אישור
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              ביטול
            </Button>
          </DialogActions>
        </DialogUi>
      </div>
    );
  }
}

export default Dialog;
