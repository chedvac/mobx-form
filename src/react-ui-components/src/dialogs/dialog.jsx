import React from 'react';
import Button from '@material-ui/core/Button';
import DialogMaterial from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import dialog from './dialog';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

@observer
class Dialog extends React.Component {
  render() {
    const { isOpen, title, content: Content, buttons } = dialog.state;

    return (
      <div>
        <DialogMaterial
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
                {btn.text}
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
