import React, { Component } from 'react';
import SimpleFieldsTab from './tabs/SimpleFieldsTab/SimpleFieldsTab';
import TablesTab from './tabs/tablesTab/tables';
import RouteSettings from 'reactNavigationRouter/RouteSettings';
import Router from 'reactUiComponents/navigation/Router';
import Toolbar from '../components/toolbar/Toolbar';
import { inject } from 'mobx-react';
import Container from 'reactUiComponents/Containers/Container';

export default class ComponentsDemo extends Component {
  // destruct non-valid props
  constructor(props) {
    super(props);
  }

  render() {
    const TablesStepper = Container(TablesTab);
    const SimpleFieldsStepper = Container(SimpleFieldsTab);

    const Tables = inject(stores => ({
      tables: this.props.rootStore.tablesTab
    }))(TablesStepper);
    const SimpleFields = inject(stores => ({
      simpleFields: this.props.rootStore.simpleFieldsTab
    }))(SimpleFieldsStepper);

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
        <Router routeSettings={tabs} />
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
