import React, { Component } from 'react';
import SimpleFieldsTab from './tabs/SimpleFieldsTab/SimpleFieldsTab';
import TablesTab from './tabs/tablesTab/tables';
import injectWrapper from '../core/inject';
import rootStore from './rootStore';
import TabSettings from '../components/navigation/TabSettings';
import TabsRouter from '../components/navigation/Router';
import Toolbar from '../components/toolbar/Toolbar';

export default class ComponentsDemo extends Component { // destruct non-valid props
    constructor(props){
        super(props)
        this.store = new rootStore();
        
    }

     
    render() {
        const SimpleFields = injectWrapper(SimpleFieldsTab, this.store.store.simpleFieldsTab);
        const Tables = injectWrapper(TablesTab, this.store.store.tablesTab);
    
        const tabs = [
            new TabSettings({number: '1',name: 'דוגמאות לשדות רגילים', path: '/SimpleFields' , component: SimpleFields}),
            new TabSettings({number: '2',name: 'טבלאות', path: '/Tables' , component: Tables})
        ]
        console.log(this.store)
        return(
           
            <form ref={c => { this.Form = c }}> 
               
                <Toolbar />
                <TabsRouter routeSettings={tabs} />
                <div className="row">
                    <div className="small-12 columns">
                        <button className="button" type="button" onClick={this.validateAll} >בדוק תקינות  </button>
                    </div>
                </div> 
            
             </form> 
        )
            
      
    }
};