import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('languageStore')
@observer
export default class Tab3 extends React.Component {
  constructor(props) {
    super(props);
    this.texts = {
      email: this.props.languageStore.computedResourcesProvider({
        hebrew: ' מייל',
        english: 'first name',
        arabic: 'first name'
      }),
      houseNumber: this.props.languageStore.computedResourcesProvider({
        hebrew: ' מספר בית',
        english: 'last name',
        arabic: 'last name'
      })
    };
  }
  render() {

    return (
      <div className="row">
        <div className="col-md-4">טאב 3</div>
      </div>
    );
  }
}
