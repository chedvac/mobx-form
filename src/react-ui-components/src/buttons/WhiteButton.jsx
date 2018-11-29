import React from 'react';
import injectSheet from 'react-jss';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  //subTitle: theme.typography.subTitle
});

@injectSheet(styles)
class WhiteButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, children, onClick } = this.props;
    return (
      <Button variant="outlined" color="primary" onClick={onClick}>
        {children}
      </Button>
    );
  }
}
export default WhiteButton;
