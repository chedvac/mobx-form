import React from 'react';
import PersonalInformation from '../../../_Demo/tabs/SimpleFieldsTab/containers/PersonalInformation/PersonalInformation';

class Link extends React.Component {
  render() {
    return (
      // <a href="https://reactjs.org/docs/typechecking-with-proptypes.html">
      //   Hello
      // </a>
      <PersonalInformation
        userDetails={window.rootStore.simpleFieldsTab.userDetails}
      />
    );
  }
}
export default Link;
