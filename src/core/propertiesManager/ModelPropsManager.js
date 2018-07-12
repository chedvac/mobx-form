import PropTypes from 'prop-types';
import ModelPropBehavior from './ModelPropBehavior';
import assertParametersType from '../typeVerifications';
import fail from 'core/exceptions';
import ComplexType from '../ComplexType';
/**
 * @class ModelPropsManager
 * @classdesc ModelPropsManager - manage all modelProps properties of complex
 */
export default class ModelPropsManager {
  constructor() {
    this.createProperty = this.createProperty.bind(this);
    this.getProperty = this.getProperty.bind(this);
    this.mapProperty = this.mapProperty.bind(this);
    this.resetProperty = this.resetProperty.bind(this);
    this.setModelProp = this.setModelProp.bind(this);
    this.reset = this.reset.bind(this);
    this.map = this.map.bind(this);
    this.setComplexProperty = this.setComplexProperty.bind(this);
  }
  properties = {};

  /**     
   * @memberof ModelPropsManager        
   * @function "createProperty"
   * @description define new property at ModelPropsManager. add it to ModelPropsManager.properties array 
   * and put reference to it at ModelPropsManager itself to easier use
   * @param {string}  propertyName
   * @example 
   modelPropsManager1.createProperty('lastName');
   */
  createProperty(propertyName) {
    assertParametersType(
      { propertyName },
      { propertyName: PropTypes.string.isRequired },
      'createProperty'
    );
    if (this.hasOwnProperty(propertyName)) {
      fail(
        `property ${propertyName} already exist in modelPropsManager.properties`
      );
    }
    const newProperty = new ModelPropBehavior();
    this.properties[propertyName] = newProperty;
    this[propertyName] = newProperty;
  }

  /**     
   * @memberof ModelPropsManager        
   * @function "getProperty"
   * @description return a property from properties
   * @param {string}  propertyName
   * @example 
   modelPropsManager1.getProperty('lastName');
   */
  getProperty(propertyName) {
    return this.properties[propertyName];
  }
  /**
    * @memberof ModelPropsManager
    * @function "setComplexProperty"
    * @description add behavior of complex property to exist property. extract ref from settings, and call property.setRef with it
    * @param {string}  propertyName
    * @param {object}  settings
    * @example
    modelPropsManager1.createProperty('lastName', {validate});
    */
  setComplexProperty(propertyName, settings = {}) {
    const propTypes = {
      propertyName: PropTypes.string.isRequired,
      settings: PropTypes.shape({
        ref: PropTypes.instanceOf(ComplexType)
      })
    };
    assertParametersType(
      { propertyName, settings },
      propTypes,
      'setComplexProperty'
    );

    const property = this.getProperty(propertyName);
    const { ref } = settings;
    property.setRef(ref);
  }
  /**     
    * @memberof ModelPropsManager        
    * @function "mapProperty"
    * @description call map function of speciphic property by name 
    * @param {string}  propertyName
    * @param {object} params
    * @example 
        modelPropsManager1.mapProperty('lastName', 'family');
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
    * @memberof ModelPropsManager        
    * @function "resetProperty"
    * @description call reset function of speciphic property by name 
    * @param {string}  propertyName
    * @param {object} params
    * @example 
        modelPropsManager1.resetProperty('lastName', {});
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
   * @memberof ModelPropsManager        
   * @function "setModelProp"
   * @description add behavior of modelProp to exist property. extract reset and map  from settings, and call PropertyBehavior set functions
   * @param {string}  propertyName
   * @param {object}  settings
   * @example 
       modelPropsManager1.setModelProp('lastName', {map, reset});
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
    * @memberof ModelPropsManager        
    * @function "reset"
    * @description reset all properties array
    * @param {object} params
    * @example 
        modelPropsManager1.reset(tab);
    */
  reset(params) {
    assertParametersType({ params }, { params: PropTypes.object }, 'reset');
    for (const property in this.properties) {
      this.resetProperty(property, params);
    }
  }

  /**     
    * @memberof ModelPropsManager        
    * @function "map"
    * @description map all properties array
    * @param {object} params
    * @example 
        modelPropsManager1.map(tab);
    */
  map(params) {
    assertParametersType({ params }, { params: PropTypes.object }, 'map');
    for (const property in this.properties) {
      this.mapProperty(property, params);
    }
  }
}
