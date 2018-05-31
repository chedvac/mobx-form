import propertyCreator from './propertyCreator'

const initializeInstance = function(complexTypeInstance){
    if (complexTypeInstance._propertiesInitialized){
        return;
    }
    const properties = complexTypeInstance._properties;
    complexTypeInstance._propertiesInitialized = true;
    for (let key in properties) {
        propertyCreator({
            target: complexTypeInstance, 
            name: properties[key].name, 
            descriptor: properties[key].descriptor,  
            validationsManager: properties[key].validationsManager
        })

    }
}
export default  initializeInstance;