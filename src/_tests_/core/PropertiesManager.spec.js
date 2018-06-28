import PropertiesManager from '../../core/PropertiesManager';
import PropertyBehavior from '../../core/PropertyBehavior';
import ComplexType from '../../core/ComplexType';
let isFirstNameValid, isLastNameValid, propertiesManager1;
let firstNameValidation = jest.fn(a => isFirstNameValid);
let lastNameValidation = jest.fn(b => isLastNameValid);
let map = jest.fn(b => b);
let firstNameReset = jest.fn(a => a);
let lastNameReset = jest.fn(b => b);
let parent;
beforeEach(()=>{            
    propertiesManager1 = new PropertiesManager(); 
    PropertyBehavior.setRef = jest.fn(b => b);
    PropertyBehavior.setValidate = jest.fn(b => b);
    PropertyBehavior.setValidationsManager = jest.fn(b => b);
})
describe('PropertiesManager', ()=>{
    test('properties object' , ()=>{
        expect(propertiesManager1.properties).toBeDefined();
    });        
    test('applyChildAction function' , ()=>{
        expect(typeof propertiesManager1.applyChildAction).toBe('function');
    });
    test('setComplexProperty function' , ()=>{
        expect(typeof propertiesManager1.setComplexProperty).toBe('function');
    });
    test('validate function' , ()=>{
        expect(typeof propertiesManager1.validate).toBe('function');
    });
    test('setFormObservableProperty function' , ()=>{
        expect(typeof propertiesManager1.setFormObservableProperty).toBe('function');
    });
    test('setModelProp function' , ()=>{
        expect(typeof propertiesManager1.setModelProp).toBe('function');
    });
    test('createProperty function' , ()=>{
        expect(typeof propertiesManager1.createProperty).toBe('function');
    });
    describe('createProperty ', ()=>{
       beforeEach(()=>{
            propertiesManager1.createProperty('firstName');
       })
        test('add new property to PropertiesManager.properties' , ()=>{
            expect(propertiesManager1.properties.firstName).toBeDefined();
            expect(propertiesManager1.properties.firstName instanceof PropertyBehavior).toBeTruthy();
        });
    });
    describe('setFormObservableProperty -  ', ()=>{
        beforeEach(()=>{
            parent = new ComplexType();
        });
        // setFormObservableProperty = function(propertyName, settings = {}){
        //     const {validate, ref, validationsManager} = settings;
        //     if(!this[propertyName] instanceof PropertyBehavior){
        //         throw('setFormObservableProperty should call after PropertiesManager.createProperty is call ');
        //     }
        //     this[propertyName].setRef(ref);
        //     this[propertyName].setValidationsManager(validationsManager);
        //     this[propertyName].setValidate(validate);
        // };
        test('without call before to createProperty should throw error' , ()=>{
            expect(()=>{propertiesManager1.setFormObservableProperty('firstName', {validate: firstNameValidation})}).toThrow('setFormObservableProperty should call after PropertiesManager.createProperty is call');
        });
        test('call PropertyBehavior.setValidate' , ()=>{
            propertiesManager1.createProperty('firstName');
            propertiesManager1.setFormObservableProperty('firstName', {validate: firstNameValidation});
            expect(PropertyBehavior.setValidate).toBeCalledWith(firstNameValidation);
        });
        test('call PropertyBehavior.setRef' , ()=>{
            const ref = {};
            propertiesManager1.createProperty('firstName');
            propertiesManager1.setFormObservableProperty('firstName', {ref});
            expect(PropertyBehavior.setRef).toBeCalledWith(ref);
        });
        test('call PropertyBehavior.setValidationsManager' , ()=>{
            const validationsManager = {};
            propertiesManager1.createProperty('firstName');
            propertiesManager1.setFormObservableProperty('firstName', {validationsManager});
            expect(PropertyBehavior.setValidationsManager).toBeCalledWith(validationsManager);
        });
    });
    describe('validate -  ', ()=>{

        beforeEach(()=>{
            isFirstNameValid = true;
            isLastNameValid = true;
            parent = new ComplexType();
            propertiesManager1.createProperty('firstName');
            propertiesManager1.setFormObservableProperty('firstName', {validate: firstNameValidation});
            propertiesManager1.createProperty('lastName');
            propertiesManager1.setFormObservableProperty('lastName', {validate: lastNameValidation});

        });
        test('parent parameter is require' , ()=>{
            expect(()=>{propertiesManager1.validate()}).toThrow('PropertiesManager.validate should get parent reference as parameter');
        });
        test('loop over all properties and call its validate function if exist' , ()=>{        
            const isValid = propertiesManager1.validate({parent});
            expect(firstNameValidation).toBeCalledWith(parent);
            expect(lastNameValidation).toBeCalledWith(parent);
        });
        test('return false if one from its properties validation failed' , ()=>{        
            let isValid = propertiesManager1.validate({parent});
            expect(isValid).toBeTruthy();
            isLastNameValid = false;
            isValid = propertiesManager1.validate({parent});
            expect(isValid).toBeFalsy();
        });
    });
    // describe('applyChildAction -  ', ()=>{
    //     beforeEach(()=>{
    //         parent = new ComplexType();
    //         propertiesManager1.setProperty('firstName', {validate: firstNameValidation, reset: firstNameReset });
    //         propertiesManager1.setProperty('lastName', {validate: lastNameValidation, reset: lastNameReset});
    //         propertiesManager1.setProperty('address', {map});
    //     });
    //     test('loop over all properties and call its validate function if exist' , ()=>{        
    //         propertiesManager1.applyChildAction('validate', {parent});
    //         expect(firstNameValidation).toBeCalledWith({parent});
    //         expect(lastNameValidation).toBeCalledWith({parent});
    //     });
    //     test('loop over all properties and call its reset function if exist' , ()=>{        
    //         propertiesManager1.applyChildAction('reset', {parent});
    //         expect(firstNameReset).toBeCalledWith({parent});
    //         expect(lastNameReset).toBeCalledWith({parent});
    //     });
    //     test('loop over all properties and call its map function if exist' , ()=>{        
    //         propertiesManager1.applyChildAction('map', {parent});
    //         expect(map).toBeCalledWith({parent});
    //     });
    // });
});

