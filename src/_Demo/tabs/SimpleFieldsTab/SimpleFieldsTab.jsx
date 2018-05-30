import React from 'react'
import {observer} from 'mobx-react'
import PersonalInformation from './containers/PersonalInformation/PersonalInformation'
import {injectWrapper} from '../../../core/inject'
import control from '../../../Fields/hocs/control'
@observer
 class SimpleFieldsTab extends React.Component{
    
    constructor(props) {
        super(props);

    }
  
    render(){
        const UserDetails = injectWrapper(PersonalInformation,this.props.userDetails)
        return(
            <div>
            <UserDetails />
            </div>
        );
    }
}
export default SimpleFieldsTab