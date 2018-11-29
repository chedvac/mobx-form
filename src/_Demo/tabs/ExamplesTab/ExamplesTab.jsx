import React from 'react';
import { observer, inject } from 'mobx-react';
import WhiteButton from 'react-ui-components/buttons/WhiteButton';
import Grid from '@material-ui/core/Grid';
@inject('languageStore')
@observer
export default class ExamplesTab extends React.Component {
  render() {
    const { confirm } = this.props.examples;
    return (
      <Grid>
        <WhiteButton variant="outlined" onClick={confirm}>
          דוגמא למימוש confirm
        </WhiteButton>
      </Grid>
    );
  }
}
