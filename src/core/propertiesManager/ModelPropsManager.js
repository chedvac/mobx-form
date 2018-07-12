import PropTypes from 'prop-types';
import ModelPropBehavior from './ModelPropBehavior';
import PropertiesManager from './PropertiesManager';
import assertParametersType from '../typeVerifications';
import ComplexType from '../ComplexType';
/**
 * @class ModelPropsManager
 * @classdesc ModelPropsManager - manage all modelProps properties of complex
 */

export default class ModelPropsManager extends PropertiesManager {

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
    const newProperty = new ModelPropBehavior();
    super.createProperty(propertyName , newProperty);
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
    Object.values(this.getProperties()).forEach(property => {
      property.reset(params);
    });
    
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
    Object.values(this.getProperties()).forEach(property => {
      property.map(params);
    });
  }
}
