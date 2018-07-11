import PropTypes from 'prop-types';

import FormObservableBehavior from './FormObservableBehavior';
import assertParametersType from '../typeVerifications';
import fail from '../exeptions';
import validationsManagerFactory from '../../validations/src/core/validationsManager';
/**
 * @class FormObservablesManager
 * @classdesc FormObservablesManager - manage all formObservables properties of complex
 */
export default class FormObservablesManager {
  constructor() {
    this.createProperty = this.createProperty.bind(this); //both
    this.getProperty = this.getProperty.bind(this); //both
    this.setFormObservableProperty = this.setFormObservableProperty.bind(this);
    this.getValidationManagerProperty = this.getValidationManagerProperty.bind(
      this
    );
    this.getPropertyValidationState = this.getPropertyValidationState.bind(
      this
    );
    this.getPropertyDependencies = this.getPropertyDependencies.bind(this);
    this.validateProperty = this.validateProperty.bind(this);
    this.validate = this.validate.bind(this);
  }
  properties = {};
  /**     
   * @memberof FormObservablesManager        
   * @function "createProperty"
   * @description define new property at ModelPropsManager. add it to ModelPropsManager.properties array 
   * and put reference to it at ModelPropsManager itself to easier use
   * @param {string}  propertyName
   * @example 
   formObservablesManager1.createProperty('lastName');
   */
  createProperty(propertyName) {
    assertParametersType(
      { propertyName },
      { propertyName: PropTypes.string.isRequired },
      'createProperty'
    );
    if (this.hasOwnProperty(propertyName)) {
      fail(
        `property ${propertyName} already exist in formObservablesManager.properties`
      );
    }
    const newProperty = new FormObservableBehavior();
    this.properties[propertyName] = newProperty;
    this[propertyName] = newProperty;
  }

  /**     
   * @memberof ModelPropsManager        
   * @function "getProperty"
   * @description return a property from properties
   * @param {string}  propertyName
   * @example 
   formObservablesManager1.getProperty('lastName');
   */
  getProperty(propertyName) {
    return this.properties[propertyName];
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
        descriptor: PropTypes.object,
        validationsManager: PropTypes.instanceOf(validationsManagerFactory)
      })
    };
    assertParametersType(
      { propertyName, settings },
      propTypes,
      'setFormObservableProperty'
    );

    const { validate, ref, validationsManager, descriptor } = settings;
    const property = this.getProperty(propertyName);
    property.setRef(ref);
    property.setValidationsManager(validationsManager);
    property.setValidate(validate);
    property.setDescriptor(descriptor);
  }
  /**     
    * @memberof FormObservablesManager        
    * @function "getPropertyValidationState"
    * @description return validationState object of speciphic property by name
    * @param {string}  propertyName
    * @example 
        formObservablesManager1.getPropertyValidationState('lastName');
    */
  getPropertyValidationState(propertyName) {
    assertParametersType(
      { propertyName },
      { propertyName: PropTypes.string.isRequired },
      'getPropertyValidationState'
    );
    const property = this.getProperty(propertyName);
    return property.validationState;
  }
  /**     
    * @memberof FormObservablesManager        
    * @function "getPropertyDependencies"
    * @description return dependedObservables object of speciphic property by name
    * @param {string}  propertyName
    * @example 
        formObservablesManager1.getPropertyDependencies('lastName');
    */
  getPropertyDependencies(propertyName) {
    assertParametersType(
      { propertyName },
      { propertyName: PropTypes.string.isRequired },
      'getPropertyDependencies'
    );

    const property = this.getProperty(propertyName);
    return property.dependedObservables;
  }
  /**     
    * @memberof FormObservablesManager        
    * @function "getValidationManagerProperty"
    * @description return validationsManager object of speciphic property by name
    * @param {string}  propertyName
    * @example 
        formObservablesManager1.getValidationManagerProperty('lastName');
    */
  getValidationManagerProperty(propertyName) {
    assertParametersType(
      { propertyName },
      { propertyName: PropTypes.string.isRequired },
      'getValidationManagerProperty'
    );

    const property = this.getProperty(propertyName);
    return property.validationsManager;
  }
  /**     
    * @memberof FormObservablesManager        
    * @function "validateProperty"
    * @description call validate function of speciphic property by name 
    * @param {string}  propertyName
    * @param {string} newVal
    * @example 
        formObservablesManager1.validateProperty('lastName', 'family');
    */
  validateProperty(propertyName, newVal) {
    const propTypes = {
      propertyName: PropTypes.string.isRequired,
      newVal: PropTypes.string
    };
    assertParametersType(
      { propertyName, newVal },
      propTypes,
      'validateProperty'
    );
    const property = this.getProperty(propertyName);
    return property.validate(newVal);
  }

  /**     
    * @memberof FormObservablesManager        
    * @function "validate"
    * @description validate all properties.formObservables array
    * @param {object}  parent
    * @example 
        formObservablesManager1.validate(tab);
    */
  validate() {
    let isValid = true;
    for (let property in this.properties) {
      const isPropertyValid = this.validateProperty(property);
      isValid = isPropertyValid ? isValid : false;
    }
    return isValid;
  }
}
