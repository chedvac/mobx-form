import React, { Component } from 'react';
import SimpleFieldsTab from './tabs/SimpleFieldsTab/SimpleFieldsTab';
import TablesTab from './tabs/tablesTab/tables';
import TabSettings from '../components/navigation/TabSettings';
import TabsRouter from '../components/navigation/Router';
import Toolbar from '../components/toolbar/Toolbar';
import {inject} from 'mobx-react';

export default class ComponentsDemo extends Component { // destruct non-valid props
    constructor(props){
        super(props)
    }
     
    render() {
        const Tables = inject(stores => ({tables: this.props.rootStore.tablesTab}))(TablesTab);
        const SimpleFields= inject(stores => ({simpleFields: this.props.rootStore.simpleFieldsTab}))(SimpleFieldsTab);
        const tabs = [
            new TabSettings({number: '1',name: 'לשדות רגילים', path: '/SimpleFields' , component: SimpleFields}),
            new TabSettings({number: '2',name: 'טבלאות', path: '/Tables' , component: Tables})
        ];
     
        console.log('rootStore',this.props.rootStore)
       
        return(
           
            <form ref={c => { this.Form = c }}> 
               
                <Toolbar />
                <TabsRouter routeSettings={tabs} />
                <div className="row">
                    <div className="small-12 columns">
                        <button className="button" type="button" onClick={this.props.rootStore.validateForm} >בדוק תקינות  </button>
                    </div>
                </div> 
                <div className="row">
                    <div className="small-12 columns">
                        <button className="button" type="button" onClick={this.props.rootStore.submitForm} >שלח   </button>
                    </div>
                </div> 
            
             </form> 
        )
            
      
    }
};