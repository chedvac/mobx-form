import React from 'react'
import {BrowserRouter,  Route } from 'react-router-dom';
import TabsNavigation from './TabsNavigation'

export default class TabsRouter extends React.Component{
    
    constructor(props) {
        super(props);
        this.props= props;
    }
    render(){
        return(
            <BrowserRouter>
                <div>                 
                    <TabsNavigation routeSettings={this.props.routeSettings} />
                        <Route  path='/' component={this.props.routeSettings[0].component} />
                    {this.props.routeSettings.map((tab, index ) =>
                        <Route key={index} path={tab.path} component={tab.component} />
                    )}
                </div>
            </BrowserRouter>

        )
    }
}
