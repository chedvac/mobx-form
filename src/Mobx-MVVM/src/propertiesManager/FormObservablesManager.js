import PropTypes from 'prop-types';

import FormObservableBehavior from 'core/propertiesManager/FormObservableBehavior';
import assertParametersType from 'utils/typeVerifications';
import validationsManagerFactory from 'validations/core/validationsManager';
import PropertiesManager from 'core/propertiesManager/PropertiesManager';
/**
 * @class FormObservablesManager
 * @classdesc FormObservablesManager - manage all formObservables properties of complex
 */
export default class FormObservablesManager extends PropertiesManager {
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
    super.createProperty(propertyName, newProperty);
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
  @assertParametersType({
    propertyName: PropTypes.string.isRequired,
    settings: PropTypes.shape({
      validate: PropTypes.func,
      ref: PropTypes.object,
      descriptor: PropTypes.object,
      validationsManager: PropTypes.instanceOf(validationsManagerFactory)
        .isRequired
    })
  })
  setFormObservableProperty(propertyName, settings = {}) {
    const { validate, ref, validationsManager, descriptor } = settings;
    const property = this.getProperty(propertyName);
    property.setRef(ref);
    property.setValidationsManager(validationsManager);
    property.setValidate(validate);
    property.setDescriptor(descriptor);
  }
}
