import React from 'react'
import {observer} from 'mobx-react'
import LabelField from '../Elements/LabelField'
import {updateValue} from './utils/actions'
import validationProps from './utils/validationProps'
import Textarea from "react-textarea-autosize";
import {enableUniqueIds} from 'react-html-id'
import './BaseTextarea.css'


@observer
export default class BaseTextareaAutoSize extends React.Component{
    
    constructor(props) {
        super(props);
        validationProps(props);
        enableUniqueIds(this);
    }
   
    
    render(){
        const {  field, label, rows=3,isAutoResize=false } = this.props || {};
        const ROW_VS_PX = 20.666666666666667;
        const MAX_ROWS = 1000;
        const minHeight = { minHeight: ROW_VS_PX*rows+'px' };
        return(
            <div>
                <LabelField label={label}  htmlFor={this.nextUniqueId()}/>
                <Textarea
                    useCacheForDOMMeasurements
                    id={this.lastUniqueId()}
                    onChange={(e)=>updateValue(e.target.value,field)}
                    value={field.value} 
                    rows={rows}
                    minRows={rows}
                    maxRows={isAutoResize? MAX_ROWS : rows}
                    className="textarea-field"
                 />
                <span className='pseudoTextArea' style={minHeight} >{field.value}</span>
                {/* <Error error={field.message}/> */}
            </div>
        );
    }
    
}
