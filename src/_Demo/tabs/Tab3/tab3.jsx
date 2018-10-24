import React from 'react';
import { observer, inject } from 'mobx-react';
import Container from 'mobx-business-components/container';
import Grid from '@material-ui/core/Grid';
import Row from 'react-ui-components/structure/row';
import SubTitle from 'react-ui-components/titles/subTitle';
import RadioButtonsGroup from 'react-ui-components/fields/RadioButtonsGroup';
import { getPropsField } from 'mobx-react-form/getProps';

@inject('languageStore')
@inject('tab3')
@observer
class Tab3 extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      gender: this.props.languageStore.computedResourcesProvider({
        hebrew: ' מין',
        english: 'Gender',
        arabic: 'Gender'
      }),
      female: this.props.languageStore.computedResourcesProvider({
        hebrew: ' נקבה',
        english: 'Female',
        arabic: 'Female'
      }),
      male: this.props.languageStore.computedResourcesProvider({
        hebrew: ' זכר',
        english: 'Male',
        arabic: 'Male'
      })
    };
    this.genderRadioButtonsDetails = [
      { value: '1', label: this.texts.female.get() },
      { value: '2', label: this.texts.male.get() }
    ];
  }

  render() {
    const { tab3 } = this.props;
    return (
      <Container beforeLeave={this.props.tab3.validate} {...this.props}>
        <Grid container>
          <SubTitle>דוגמא לקבוצת רדיו</SubTitle>
          <Row>
            <RadioButtonsGroup
              label={this.texts.gender.get()}
              radioButtonsDetails={this.genderRadioButtonsDetails}
              {...getPropsField(tab3, 'gender')}
              tab3={tab3}
            />
          </Row>
        </Grid>
      </Container>
    );
  }
}

export default Tab3