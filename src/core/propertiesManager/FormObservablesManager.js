import PropTypes from 'prop-types';

import FormObservableBehavior from './FormObservableBehavior';
import assertParametersType from '../typeVerifications';
import validationsManagerFactory from '../../validations/src/core/validationsManager';
import PropertiesManager from './PropertiesManager';
/**
 * @class FormObservablesManager
 * @classdesc FormObservablesManager - manage all formObservables properties of complex
 */
export default class FormObservablesManager extends PropertiesManager{
  
  /**     
   * @memberof FormObservablesManager        
   * @function "createProperty"
   * @description define new property at FormObservablesManager. add it to FormObservablesManager._properties array 
   * and put reference to it at FormObservablesManager itself to easier use
   * @param {string}  propertyName
   * @example 
   formObservablesManager1.createProperty('lastName');
   */
  createProperty(propertyName) {
    const newProperty = new FormObservableBehavior();
    super.createProperty(propertyName , newProperty);
  }

  /**     
    * @memberof FormObservablesManager        
    * @function "setFormObservableProperty"
    * @description add behavior of formObservable to exist property. extract validate, ref and validationsManager from settings, and call PropertyBehavior set functions
    * @param {string}  propertyName
    * @param {object}  settings
    * @example 
     formObservablesManager1.setFormObservableProperty('lastName', {validate, ref, validationsManager});
    */

  setFormObservableProperty(propertyName, settings = {}) {
    const propTypes = {
      propertyName: PropTypes.string.isRequired,
      settings: PropTypes.shape({
        validate: PropTypes.func,
        ref: PropTypes.object,
        validationsManager: PropTypes.instanceOf(validationsManagerFactory)
      })
    };
    assertParametersType(
      { propertyName, settings },
      propTypes,
      'setFormObservableProperty'
    );

    const { validate, ref, validationsManager } = settings;
    const property = this.getProperty(propertyName);
    property.setRef(ref);
    property.setValidationsManager(validationsManager);
    property.setValidate(validate);
  }

}
