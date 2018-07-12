import PropTypes from 'prop-types';
import assertParametersType from '../typeVerifications';
import fail from '../exeptions';
import ModelPropBehavior from './ModelPropBehavior';
import FormObservableBehavior from './FormObservableBehavior';

/**
 * @class PropertiesManager
 * @classdesc PropertiesManager - properties manager base class
 */
const properties = Symbol();
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
   * @function "createProperty"
   * @description define new property . add it to properties object 
   * and put reference to it at itself to easier use
   * @param {string}  propertyName
   * @param {}  newProperty
   * @example 
   propertiesManager1.createProperty('lastName');
   */
  createProperty(propertyName, newProperty) {
    const propTypes = {
      propertyName: PropTypes.string.isRequired,
      newProperty: PropTypes.oneOfType([
        PropTypes.instanceOf(FormObservableBehavior),
        PropTypes.instanceOf(ModelPropBehavior)
      ])
    };
    assertParametersType({ propertyName }, propTypes, 'createProperty');
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
  getProperty(propertyName) {
    assertParametersType({ propertyName }, {propertyName:PropTypes.string.isRequired}, 'getProperty');
    return this.getProperties()[propertyName];
  }
}
