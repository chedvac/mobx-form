import React from 'react'
import {observer} from 'mobx-react'
import control from './hocs/control'
import withRegister from './hocs/withRegister'
import {renderLabel} from './utils/renderLabel'
import {renderError} from './utils/renderError'
import {AppContext} from '../components/Form/AppContext'

// import { compose } from 'recompose'


@observer
class Input extends React.Component{
    
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.register(this);
        //console.log('register ', this.props.register)
      }
      validateFn(){
          return true;
      }
    render(){
        return(
            // <AppContext.Consumer>
            //     {value =>
            <div>
                {renderLabel(this.props)}
                <input {...this.props} className="text-field" />  
                {renderError(this.props.message)}
            </div> 
            //     }
            // </AppContext.Consumer>
        )   
    
    }
}
//export default compose(withRegister,control)(Input)
//export default withRegister(control(Input))
//export default control(Input)
//export default Input
export default withRegister(Input)