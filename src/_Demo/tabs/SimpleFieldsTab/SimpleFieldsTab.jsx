import React from 'react'
import {observer} from 'mobx-react'
import PersonalInformation from './containers/PersonalInformation/PersonalInformation'
import control from '../../../Fields/hocs/control'

@observer
 class SimpleFieldsTab extends React.Component{
    
    constructor(props) {
        super(props);

    }
  
    render(){
         return(
            <div>
            <PersonalInformation userDetails={this.props.simpleFields.userDetails} />
            </div>
        );
    }
}
export default SimpleFieldsTab