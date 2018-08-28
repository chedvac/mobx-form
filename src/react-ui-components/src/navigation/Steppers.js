import React from 'react';
import Link from 'reactNavigationRouter/Link';

export default class Steppers extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="navigation-holder">
        <ul className="navigation">
          {this.props.routeSettings.map((route, index) => (
            <li className="tab-item" key={index}>
              <Link to={route.path}>
                <span className="number">{route.number}</span>
              </Link>
              <span className="title"> {route.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
