import PropTypes from 'prop-types';
import assertParametersType from 'utils/typeVerifications';
import fail from 'utils/fail';
import ModelPropBehavior from './ModelPropBehavior';
import FormObservableBehavior from './FormObservableBehavior';

/**
 * @class PropertiesManager
 * @classdesc PropertiesManager - properties manager base class
 */
const properties = Symbol('properties');
export default class PropertiesManager {
  [properties] = {};
  /**     
   * @memberof PropertiesManager        
   * @function "getProperties"
   * @description return all properties
   * @example 
   propertiesManager1.getProperties();
   */
  getProperties() {
    return this[properties];
  }
  /**     
   * @memberof PropertiesManager        
   * @function "registerProperty"
   * @description define new property . add it to properties object 
   * and put reference to it at itself to easier use
   * @param {string}  propertyName
   * @param {}  newProperty
   * @example 
   propertiesManager1.registerProperty('lastName');
   */
  @assertParametersType({
    propertyName: PropTypes.string.isRequired,
    newProperty: PropTypes.oneOfType([
      PropTypes.instanceOf(FormObservableBehavior),
      PropTypes.instanceOf(ModelPropBehavior)
    ])
  })
  registerProperty(propertyName, newProperty) {
    if (this.hasOwnProperty(propertyName)) {
      fail(`property ${propertyName} already exist in properties`);
    }
    this.getProperties()[propertyName] = newProperty;
    this[propertyName] = newProperty;
  }

  /**     
   * @memberof PropertiesManager        
   * @function "getProperty"
   * @description return a property from properties
   * @param {string}  propertyName
   * @example 
   propertiesManager1.getProperty('lastName');
   */
  @assertParametersType({ propertyName: PropTypes.string.isRequired })
  getProperty(propertyName) {
    const property = this.getProperties()[propertyName];
    if (!property) {
      fail(`property ${propertyName} doesn't exist in properties`);
    }
    return property;
  }
}
