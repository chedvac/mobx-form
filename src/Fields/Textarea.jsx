import React from 'react'
import {observer} from 'mobx-react'
import control from './hocs/control' 
import TextareaAutosize  from "react-textarea-autosize";
import {renderLabel} from './utils/renderLabel'
import {renderError} from './utils/renderError'
import './CSS/Textarea.css'

@observer
class Textarea extends React.Component{
    
    constructor(props) {
        super(props);
    }
    render(){
        const { rows=3,isAutoResize=false, ...props } = this.props || {};
        const ROW_VS_PX = 20.666666666666667;
        const MAX_ROWS = 1000;
        const minHeight = { minHeight: ROW_VS_PX*rows+'px' };
        return(
            <div>
                 {renderLabel(props)}
                <TextareaAutosize
                    {...props}
                    useCacheForDOMMeasurements

                    rows={rows}
                    minRows={rows}
                    maxRows={isAutoResize? MAX_ROWS : rows}
                    className="textarea-field"
                 />
                <span className='pseudoTextArea' style={minHeight} >{props.field}</span>
                {renderError(props.message)}
            </div>
        );
    }
}
export default control(Textarea)
