import React from 'react'
import {Link } from 'react-router-dom';

export default class TabsNavigation extends React.Component{
    
    constructor(props) {
        super(props);
        this.props= props;
    }
    render(){
        return(
            <div className="tabs-navigation-holder">
                <ul className="tabs-navigation">
                    {this.props.routeSettings.map((route, index) =>
                        <li className="tab-item" key={index}>
                            <Link to={route.path}> 
                                <span className="tab-number">{route.number}</span>
                            </Link>
                            <span className="tab-title"> {route.name}</span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
