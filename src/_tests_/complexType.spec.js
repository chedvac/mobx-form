import ComplexType from '../core/ComplexType';
import validationsManagerFactory from "../validations/validationsManager"
import PropertiesManager from '../core/PropertiesManager'
import {registerComplexProperties} from "../core/initializeComplexType";
import formObservable from "../core/formObservable"
import modelProp from "../core/modelProp"
import initializeInstance from '../core/initializeComplexType'
import {hebrewName} from '../validations/languages'

let customTab;

class Complex extends ComplexType {
    constructor(){
        super();
    }
    @formObservable() inComplex = false;
}

class Tab extends ComplexType {
    validateFirstName(){
        this.firstName !=='yael';
    };
    constructor(register){
        super();
        this.complex = new Complex();
        if(register){
            registerComplexProperties(this);
        }
        this.setValidations([{
            validator: this.validateFirstName, 
            message: 'not valid'
        }]);
    };
    @modelProp() @formObservable ({ validations:[]}) agreement = "";        
    @modelProp() @formObservable () firstName = "yael";        
    @modelProp() complex;
    

};
beforeEach(()=>{            
    customTab = new Tab(); 
})
describe('ComplexType', ()=>{
    describe('define properties:', ()=>{
       
        test('message' , ()=>{
            expect(customTab.message).toBe('');
        });
        test('isValid' , ()=>{
            expect(customTab.isValid).toBe(true);
        });
        test('validationsManager' , ()=>{
            expect(customTab.validationsManager instanceof validationsManagerFactory).toBe(true);
        });
        test('propertiesManager' , ()=>{
            expect(customTab.propertiesManager instanceof PropertiesManager).toBe(true);
        });
    });
    describe('constructor call initializeInstance - set all properties in propertiesManager', ()=>{
        test('set formObservable' , ()=>{
            expect(customTab.propertiesManager.properties.firstName).toBeDefined();
        });
        test('set modelProp' , ()=>{
            expect(customTab.propertiesManager.properties.complex).toBeDefined();
        });
    });
    describe('initialProperty - add property to propertiesManager', ()=>{
        
        test('set new property' , ()=>{
            const set = ()=>{return true}
            customTab.initialProperty('name', {set});
            expect(customTab.propertiesManager.properties.name).toBeDefined();
            expect(customTab.propertiesManager.properties.name.set).toBe(set);
        });
        test('update exist property' , ()=>{
            const set = ()=>{return true}
            customTab.initialProperty('firstName', {set});
            expect(customTab.propertiesManager.properties.firstName).toBeDefined();
            expect(customTab.propertiesManager.properties.firstName.ref).toBeDefined();
            expect(customTab.propertiesManager.properties.firstName.set).toBe(set);
        });
    });
    describe('applyChildAction', ()=>{
        test('exeac all properties action with this name' , ()=>{
            const set = jest.fn();
            customTab.initialProperty('firstName', {set});
            customTab.initialProperty('agreement', {set});
            customTab.applyChildAction('set');
            expect(customTab.propertiesManager.properties.firstName.set).toBeCalled();
            expect(customTab.propertiesManager.properties.agreement.set).toBeCalled();
        });
    });
    describe('validate - validate complex and all childs', ()=>{
        describe('validate complex' , ()=>{
            test('call validations fail - update message and isValid' , ()=>{
                customTab.validate();
                expect(customTab.message).toBe('not valid');
                expect(customTab.isValid).toBeFalsy();
            });
            test('call validations sucsses' , ()=>{
                customTab.firstName = '';
                customTab.validate();
                expect(customTab.message).toBe('');
                expect(customTab.isValid).toBeTruthy();
            });
        });
        describe('validate child and update isValid by result' , ()=>{
            test('call validations fail - update message and isValid' , ()=>{
                customTab.validate();
                expect(customTab.message).toBe('not valid');
                expect(customTab.isValid).toBeFalsy();
            });
            test('call validations sucsses' , ()=>{
                customTab.firstName = '';
                customTab.validate();
                expect(customTab.message).toBe('');
                expect(customTab.isValid).toBeTruthy();
            });
        });
    });
});
