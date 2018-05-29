import React, { Component } from 'react';
import SimpleFieldsTab from './tabs/SimpleFieldsTab/SimpleFieldsTab';
import TablesTab from './tabs/tablesTab/tables';
import {injectWrapper} from '../core/inject';
import TabSettings from '../components/navigation/TabSettings';
// import TabsRouter from '../components/navigation/Router';
import Toolbar from '../components/toolbar/Toolbar';


export default class ComponentsDemo extends Component { // destruct non-valid props
    constructor(props){
        super(props)
    }

     
    render() {
        const SimpleFields = injectWrapper(SimpleFieldsTab, this.props.rootStore.model.formData.simpleFieldsTab);
        // const Tables = injectWrapper(TablesTab, this.props.rootStore.model.formData.tablesTab);
    
        // const tabs = [
        //     new TabSettings({number: '1',name: 'דוגמאות לשדות רגילים', path: '/SimpleFields' , component: SimpleFields}),
        //     new TabSettings({number: '2',name: 'טבלאות', path: '/Tables' , component: Tables})
        // ]
     
        window.rootStore = this.props.rootStore
        return(
           
            <form ref={c => { this.Form = c }}> 
               
                <Toolbar />
                <SimpleFields/>
                {/* <Tables/> */}
                <div className="row">
                    <div className="small-12 columns">
                        <button className="button" type="button" onClick={this.validateAll} >בדוק תקינות  </button>
                    </div>
                </div> 
            
             </form> 
        )
            
      
    }
};