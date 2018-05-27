import React from 'react'
import {observer} from 'mobx-react'
import control from './hocs/control'
import {renderLabel} from './utils/renderLabel'
import {renderError} from './utils/renderError'

@observer
class Input extends React.Component{
    
    constructor(props) {
        super(props);
    }
   
    render(){
        return(
            <div>
                {renderLabel(this.props)}
                <input {...this.props} className="text-field" />  
                {renderError(this.props.message)}
            </div> 
        )   
    
    }
}
export default control(Input)
