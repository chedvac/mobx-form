import React from 'react'
import {observer} from 'mobx-react'
import control from './hocs/control'
import {renderLabel} from './utils/renderLabel'
import {renderError} from './utils/renderError'


@observer
class Checkbox extends React.Component{
    
    constructor(props) {
        super(props);
    }
      
    render(){
        return(
            <div>
                
                <input type="checkbox" {...this.props}
                    className="checkbox-field" 
                />   
                {renderLabel(this.props)}
                {renderError(this.props.message)}
            </div>
        );
    }
  
}
export default control(Checkbox)