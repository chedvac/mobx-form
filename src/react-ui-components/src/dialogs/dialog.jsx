import React from 'react';
import Button from '@material-ui/core/Button';
import DialogMaterial from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import dialog from './dialog';
import { observer } from 'mobx-react';

@observer
class Dialog extends React.Component {
  render() {
    const { buttons, title, message, isOpen, close } = dialog.state;
    return (
      <div>
        <DialogMaterial
          open={isOpen}
          onClose={close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> {title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {buttons.map((btn, index) => (
              <Button key={index} onClick={btn.click} color="primary">
                {btn.text}
              </Button>
            ))}
          </DialogActions>
        </DialogMaterial>
      </div>
    );
  }
}

export default Dialog;
