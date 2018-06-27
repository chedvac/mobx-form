import PropertyBehavior from './PropertyBehavior';
/**
 * @class PropertiesManager
 * @classdesc PropertiesManager - manage all properties of complex
 */
export default class PropertiesManager {
    constructor(){
        this.setFormObservableProperty = this.setFormObservableProperty.bind(this);
        this.setModelProp = this.setModelProp.bind(this);
        this.applyChildAction = this.applyChildAction.bind(this);
        this.validate = this.validate.bind(this);
        this.createProperty =  this.createProperty.bind(this);
        this.setComplexProperty = this.setComplexProperty.bind(this);
    }
    properties = {};
     /**     
    * @memberof PropertiesManager         
    * @function "createProperty"
    * @description define new property at PropertiesManager. add it to PropertiesManager.properties array 
    * and put reference to it at PropertiesManager itself to easier use
    * @param {string}  propertyName
    * @example 
    propertiesManager1.createProperty('lastName');
    */
    createProperty = function(propertyName){
        this.properties[propertyName] = new PropertyBehavior();
        this[propertyName] = this.properties[propertyName];
    };
    /**     
    * @memberof PropertiesManager         
    * @function "setComplexProperty"
    * @description add behavior of complex property to exist property. extract validate from settings, asd call property.setValidate with it
    * @param {string}  propertyName
    * @param {object}  settings
    * @example 
    propertiesManager1.createProperty('lastName', {validate});
    */
    setComplexProperty = function(propertyName, settings = {}){
        if(!this[propertyName] instanceof PropertyBehavior){
            throw('setComplexProperty should call after PropertiesManager.createProperty is call');
        }
        const {validate} = settings;
        this[propertyName].setValidate(validate);
    };
    /**     
    * @memberof PropertiesManager         
    * @function "setFormObservableProperty"
    * @description add behavior of formObservable to exist property. extract validate, ref and validationsManager from settings, and call PropertyBehavior set functions
    * @param {string}  propertyName
    * @param {object}  settings
    * @example 
     propertiesManager1.setFormObservableProperty('lastName', {validate, ref, validationsManager});
    */
    setFormObservableProperty = function(propertyName, settings = {}){
        if(!this[propertyName] instanceof PropertyBehavior){
            throw('setFormObservableProperty should call after PropertiesManager.createProperty is call');
        }
        const {validate, ref, validationsManager} = settings;
        this[propertyName].setRef(ref);
        this[propertyName].setValidationsManager(validationsManager);
        this[propertyName].setValidate(validate);
    };
     /**     
    * @memberof PropertiesManager         
    * @function "setModelProp"
    * @description add behavior of modelProp to exist property. extract reset and map  from settings, and call PropertyBehavior set functions
    * @param {string}  propertyName
    * @param {object}  settings
    * @example 
        propertiesManager1.setModelProp('lastName', {map, reset});
    */
    setModelProp = function(propertyName, settings = {}){
        const {reset, map} = settings;
        this[propertyName].setReset(reset);
        this[propertyName].setMap(map);
    };
    /**     
    * @memberof PropertiesManager         
    * @function "applyChildAction"
    * @description loop over all properties array, exac the requested action with settings parameter
    * @param {string}  actionName
    * @param {object}  params
    * @example 
        propertiesManager1.applyChildAction('reset', {});
    */
    applyChildAction(actionName, params = {}){
        try{
            for (let property in this.properties) {
                typeof this.properties[property][actionName] === 'function' ? this.properties[property][actionName](params) : false;
            }
        }catch(ex){
            console.log(ex)
        }        
    }
    //private
    validateChild(child, parent){
        return typeof child['validate'] === 'function' ? child.validate(parent) : true;
    };
    /**     
    * @memberof PropertiesManager         
    * @function "validate"
    * @description validate all properties array
    * @param {object}  parent
    * @example 
        propertiesManager1.validate(tab);
    */
    validate({parent} = {}){
        if(!parent){
            throw('PropertiesManager.validate should get parent reference as parameter')
        }
        let isValid = true; 
        for (let property in this.properties) {
            isValid = this.validateChild(this.properties[property], parent) ? isValid : false; 
       }
       return isValid;
    };
    // reset(parent){
    //     let childrenValid = true; 
    //     for (const property in this.propertiesManager) {
    //         if(!property.validate(parent)){
    //             childrenValid = false 
    //         }
    //    }
    //    return childrenValid;
    // }

};