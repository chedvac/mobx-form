import PropTypes from 'prop-types';
import ModelPropBehavior from 'core/propertiesManager/ModelPropBehavior';
import PropertiesManager from 'core/propertiesManager/PropertiesManager';
import assertParametersType from 'utils/typeVerifications';
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
    super.createProperty(propertyName, newProperty);
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
  @assertParametersType({
    propertyName: PropTypes.string.isRequired,
    settings: PropTypes.shape({
     // ref: PropTypes.instanceOf(ComplexType)
    })
  })
  setComplexProperty(propertyName, settings = {}) {
    const property = this.getProperty(propertyName);
    const { ref } = settings;
    property.setRef(ref);
    if(property.reset){
      property.setReset(ref.reset());
    }
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
  @assertParametersType({
    propertyName: PropTypes.string.isRequired,
    settings: PropTypes.shape({
      reset: PropTypes.func,
      map: PropTypes.func
    })
  })
  setModelProp(propertyName, settings = {}) {
    const { reset, map } = settings;
    const property = this.getProperty(propertyName);
    property.setReset(reset);
    property.setMap(map);
  }

  /**     
    * @memberof ModelPropsManager        
    * @function "map"
    * @description map all properties array
    * @param {object} params
    * @example 
        modelPropsManager1.map(tab);
    */
  @assertParametersType({ params: PropTypes.object })
  map(params) {
    Object.values(this.getProperties()).forEach(property => {
      property.map(params);
    });
  }
}
