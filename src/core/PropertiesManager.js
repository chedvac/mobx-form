import PropTypes from 'prop-types';

import PropertyBehavior from './PropertyBehavior';
import assertParametersType from './typeVerifications';
import fail from './exeptions';
import validationsManagerFactory from '../validations/validationsManager';
/**
 * @class PropertiesManager
 * @classdesc PropertiesManager - manage all properties of complex
 */
export default class PropertiesManager {
  constructor() {
    this.setFormObservableProperty = this.setFormObservableProperty.bind(this);
    this.getValidationManagerProperty = this.getValidationManagerProperty.bind(
      this
    );
    this.getPropertyDependencies = this.getPropertyDependencies.bind(this);
    this.validateProperty = this.validateProperty.bind(this);
    this.mapProperty = this.mapProperty.bind(this);
    this.resetProperty = this.resetProperty.bind(this);
    this.setModelProp = this.setModelProp.bind(this);
    this.applyChildAction = this.applyChildAction.bind(this);
    this.validate = this.validate.bind(this);
    this.reset = this.reset.bind(this);
    this.map = this.map.bind(this);
    this.setComplexProperty = this.setComplexProperty.bind(this);
    this.createProperty = this.createProperty.bind(this);
    this.getProperty = this.getProperty.bind(this);
  }
  properties = {};
  getProperty(propertyName) {
    const property = this.properties[propertyName];
    const propertyNotExist = `Property ${propertyName} doesn't exist in properties, call to PropertiesManager.createProperty before`;

    // assertType(
    //   property,
    //   PropTypes.instanceOf(PropertyBehavior).isRequired,
    //   propertyNotExist
    // );
    return property;
  }

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
    * @memberof PropertiesManager         
    * @function "getPropertyDependencies"
    * @description return dependedObservables object of speciphic property by name
    * @param {string}  propertyName
    * @example 
        propertiesManager1.getPropertyDependencies('lastName');
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
    * @memberof PropertiesManager         
    * @function "getValidationManagerProperty"
    * @description return validationsManager object of speciphic property by name
    * @param {string}  propertyName
    * @example 
        propertiesManager1.getValidationManagerProperty('lastName');
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
    * @memberof PropertiesManager         
    * @function "validateProperty"
    * @description call validate function of speciphic property by name 
    * @param {string}  propertyName
    * @param {string} newVal
    * @example 
        propertiesManager1.validateProperty('lastName', 'family');
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
    const validate = property.validate;
    // if (checkType(validate, PropTypes.func.isRequired)) {
    //   return validate(newVal);
    // }
    return true;
  }
  /**     
    * @memberof PropertiesManager         
    * @function "mapProperty"
    * @description call map function of speciphic property by name 
    * @param {string}  propertyName
    * @param {object} params
    * @example 
        propertiesManager1.mapProperty('lastName', 'family');
    */
  mapProperty(propertyName, params) {
    const propTypes = {
      propertyName: PropTypes.string.isRequired,
      params: PropTypes.object
    };
    assertParametersType({ propertyName, params }, propTypes, 'mapProperty');
    const property = this.getProperty(propertyName);
    return property.map(params);
  }
  /**     
    * @memberof PropertiesManager         
    * @function "resetProperty"
    * @description call reset function of speciphic property by name 
    * @param {string}  propertyName
    * @param {object} params
    * @example 
        propertiesManager1.resetProperty('lastName', {});
    */
  resetProperty(propertyName, params) {
    const propTypes = {
      propertyName: PropTypes.string.isRequired,
      params: PropTypes.object
    };
    assertParametersType({ propertyName, params }, propTypes, 'resetProperty');
    const property = this.getProperty(propertyName);
    return property.reset(params);
  }
  /**     
   * @memberof PropertiesManager         
   * @function "createProperty"
   * @description define new property at PropertiesManager. add it to PropertiesManager.properties array 
   * and put reference to it at PropertiesManager itself to easier use
   * @param {string}  propertyName
   * @example 
   propertiesManager1.createProperty('lastName');
   */
  createProperty(propertyName) {
    assertParametersType(
      { propertyName },
      { propertyName: PropTypes.string.isRequired },
      'createProperty'
    );

    if (this.hasOwnProperty(propertyName)) {
      fail(`property ${propertyName} already exist `);
    }
    this.properties[propertyName] = new PropertyBehavior();
    this[propertyName] = this.properties[propertyName];
  }

  /**     
    * @memberof PropertiesManager         
    * @function "setComplexProperty"
    * @description add behavior of complex property to exist property. extract validate from settings, asd call property.setValidate with it
    * @param {string}  propertyName
    * @param {object}  settings
    * @example 
    propertiesManager1.createProperty('lastName', {validate});
    */
  setComplexProperty(propertyName, settings = {}) {
    const propTypes = {
      propertyName: PropTypes.string.isRequired,
      settings: PropTypes.shape({
        validate: PropTypes.func
      })
    };
    assertParametersType(
      { propertyName, settings },
      propTypes,
      'setComplexProperty'
    );

    const property = this.getProperty(propertyName);
    const { validate } = settings;
    property.setValidate(validate);
  }
  /**     
    * @memberof PropertiesManager         
    * @function "setFormObservableProperty"
    * @description add behavior of formObservable to exist property. extract validate, ref and validationsManager from settings, and call PropertyBehavior set functions
    * @param {string}  propertyName
    * @param {object}  settings
    * @example 
     propertiesManager1.setFormObservableProperty('lastName', {validate, ref, validationsManager});
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
  /**     
   * @memberof PropertiesManager         
   * @function "setModelProp"
   * @description add behavior of modelProp to exist property. extract reset and map  from settings, and call PropertyBehavior set functions
   * @param {string}  propertyName
   * @param {object}  settings
   * @example 
       propertiesManager1.setModelProp('lastName', {map, reset});
   */
  setModelProp(propertyName, settings = {}) {
    const propTypes = {
      propertyName: PropTypes.string.isRequired,
      settings: PropTypes.shape({
        reset: PropTypes.func,
        map: PropTypes.func
      })
    };
    assertParametersType({ propertyName, settings }, propTypes, 'setModelProp');

    const { reset, map } = settings;
    const property = this.getProperty(propertyName);
    property.setReset(reset);
    property.setMap(map);
  }
  /**     
    * @memberof PropertiesManager         
    * @function "applyChildAction"
    * @description loop over all properties array, exac the requested action with settings parameter
    * @param {string}  actionName
    * @param {object}  params
    * @example 
        propertiesManager1.applyChildAction('reset', {});
    */
  applyChildAction(actionName, params = {}) {
    const propTypes = {
      actionName: PropTypes.string.isRequired,
      params: PropTypes.object
    };
    assertParametersType({ actionName, params }, propTypes, 'applyChildAction');

    try {
      for (let property in this.properties) {
        // checkType(
        //   this.properties[property][actionName],
        //   PropTypes.func.isRequired
        // )
        // ? this.properties[property][actionName](params)
        // : false;
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  /**     
    * @memberof PropertiesManager         
    * @function "validate"
    * @description validate all properties array
    * @param {object}  parent
    * @example 
        propertiesManager1.validate(tab);
    */
  validate() {
    let isValid = true;
    for (let property in this.properties) {
      const isPropertyValid = this.validateProperty(property);
      isValid = isPropertyValid ? isValid : false;
    }
    return isValid;
  }
  /**     
    * @memberof PropertiesManager         
    * @function "reset"
    * @description reset all properties array
    * @param {object} params
    * @example 
        propertiesManager1.reset(tab);
    */
  reset(params) {
    assertParametersType({ params }, { params: PropTypes.object }, 'reset');
    for (const property in this.propertiesManager) {
      this.resetProperty(property, params);
    }
  }

  /**     
    * @memberof PropertiesManager         
    * @function "map"
    * @description map all properties array
    * @param {object} params
    * @example 
        propertiesManager1.map(tab);
    */
  map(params) {
    assertParametersType({ params }, { params: PropTypes.object }, 'map');
    for (const property in this.propertiesManager) {
      this.mapProperty(property, params);
    }
  }
}
