import React from 'react';
import {observer} from 'mobx-react';
@observer
class ToolbarAction extends React.Component{
    
    constructor(props) {
        super(props);    
    }

    render(){
        const {action, isEnable, title, classes, accesskey, actionText} = this.props.actionSettings;
        return(
            <li>
                <a onClick={action} accessKey={accesskey} title={title} 
                    className={classes} role='button'>
                    <i></i>                
                    <span>{actionText}</span>

                </a>
            </li>
        );
    }
}

  export default ToolbarAction;