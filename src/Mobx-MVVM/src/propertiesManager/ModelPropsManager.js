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
   * @param {object}  property
   * @example 
   modelPropsManager1.createProperty('lastName');
   */
  createProperty(property) {
    const newProperty = new ModelPropBehavior(property);
    this.registerProperty(property.name, newProperty);
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
  }


  
}
