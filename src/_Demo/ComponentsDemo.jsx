import React, { Component } from 'react';
import SimpleFieldsTab from './tabs/SimpleFieldsTab/SimpleFieldsTab';
// import TablesTab from './tabs/tablesTab/tables';
import injectWrapper from '../core/inject';
import TabSettings from '../components/navigation/TabSettings';
// import TabsRouter from '../components/navigation/Router';
import Toolbar from '../components/toolbar/Toolbar';
import {inject} from 'mobx-react'


@inject("rootStore")
export default class ComponentsDemo extends Component { // destruct non-valid props
    constructor(props){
        super(props)
    }

     
    render() {
        const SimpleFields = injectWrapper(SimpleFieldsTab, this.props.rootStore.store.simpleFieldsTab);
        // const Tables = injectWrapper(TablesTab, this.props.rootStore.store.tablesTab);
    
        // const tabs = [
        //     new TabSettings({number: '1',name: 'דוגמאות לשדות רגילים', path: '/SimpleFields' , component: SimpleFields}),
        //     new TabSettings({number: '2',name: 'טבלאות', path: '/Tables' , component: Tables})
        // ]
     
        console.log('rootStore',this.props.rootStore.store)
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