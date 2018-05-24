import React from 'react'
import './LabelField.css'

export default class LabelField extends React.Component {
    render() {
        const { label, isRequired,htmlFor} = this.props ;
       return label?
            <label htmlFor={htmlFor} className={"label-field " + (isRequired? "required":"")}>{label}</label>
        :null;
        
    }
  }
  