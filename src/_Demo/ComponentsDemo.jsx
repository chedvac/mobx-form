import React, { Component } from 'react';
import SimpleFieldsTab from './tabs/SimpleFieldsTab/SimpleFieldsTab';
import TablesTab from './tabs/tablesTab/tables';
import Tab3 from './tabs/Tab3/tab3';
import RouteSettings from 'reactNavigationRouter/RouteSettings';
import Navigation from 'reactUiComponents/navigation/Navigation';
import Toolbar from '../components/toolbar/Toolbar';
import { inject } from 'mobx-react';

export default class ComponentsDemo extends Component {
  // destruct non-valid props
  constructor(props) {
    super(props);
  }

  render() {
    const Tables = inject(stores => ({
      tables: this.props.rootStore.tablesTab
    }))(TablesTab);
    const SimpleFields = inject(stores => ({
      simpleFields: this.props.rootStore.simpleFieldsTab
    }))(SimpleFieldsTab);

    const tabs = [
      new RouteSettings({
        number: '1',
        name: 'לשדות רגילים',
        path: '/SimpleFields',
        component: SimpleFields
      }),
      new RouteSettings({
        number: '2',
        name: 'טבלאות',
        path: '/Tables',
        component: Tables
      }),
      new RouteSettings({
        number: '3',
        name: 'טאב 3',
        path: '/Tab3',
        component: Tab3
      })
    ];
    // const RouterIn = new Router({ routeSettings: tabs });
    console.log('rootStore', this.props.rootStore);

    return (
      <form
        ref={c => {
          this.Form = c;
        }}
      >
        <Toolbar />
        <Navigation routeSettings={tabs} />
        <div className="row">
          <div className="small-12 columns">
            <button
              className="button"
              type="button"
              onClick={this.props.rootStore.validateForm}
            >
              בדוק תקינות{' '}
            </button>
          </div>

          <div className="small-12 columns">
            <button
              className="button"
              type="button"
              onClick={this.props.rootStore.submitForm}
            >
              שלח{' '}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
