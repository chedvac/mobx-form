import {initializeProperties , initializeComplexProperties, registerProperty } from '../../core/complexPropertiesRegistration';
import formObservableGenerator from '../../core/formObservableGenerator'
import {modelPropGenerator} from '../../core/modelProp';
let map, target, descriptor;
const complexInitilize = {
    _propertiesInitialized: false,
    _properties: {
        firstName: {isModelProp: true, isFormObservable: true},
        lastName: {isModelProp: true},
        address: {isFormObservable: true}
    }
};
beforeEach(()=>{            
    map = jest.fn(b => b);
    modelPropGenerator = jest.fn(b => b);
    formObservableGenerator = jest.fn(b => b);

    target = {}; 
    descriptor = (target, 'name', {
        value: 42,
        writable: false
    });
})
describe('registerProperty', ()=>{
    describe('require params: ', ()=>{
        test('target' , ()=>{
            expect(()=>{registerProperty({name: 'a', descriptor })}).toThrow('registerProperty faile: missing require parameter: target, descriptor or name');
        });    
        test('name' , ()=>{
            expect(()=>{registerProperty({target: {}, descriptor})}).toThrow('registerProperty faile: missing require parameter: target, descriptor or name');
        }); 
        test('descriptor' , ()=>{
            expect(()=>{registerProperty({target: {}})}).toThrow('registerProperty faile: missing require parameter: target, descriptor or name');
        }); 
    });
    describe('register to _properties object- define new property: ', ()=>{
        beforeEach(()=>{
            registerProperty({target ,name: 'firstName',descriptor, map });
        })
        test('property has the name as key' , ()=>{
            expect(target._properties.firstName).toBeDefined();
        });      
        test('property include descriptor' , ()=>{
            expect(target._properties.firstName.descriptor).toBe(descriptor);
        });    
        test('property include all other params' , ()=>{
            expect(target._properties.firstName.map).toBeDefined();
        });        
    });
});
describe('initializeProperties - loop over all _properties object and initialize them by type:  formObservable and modelProp', ()=>{
    beforeEach(()=>{
        initializeProperties({complexInitilize});
    })
    test('initializeProperties is once' , ()=>{
        expect(formObservableGenerator.calls.length).toBe(2);
        expect(modelPropGenerator.calls.length).toBe(1);
        initializeProperties({complexInitilize});
        expect(formObservableGenerator.calls.length).toBe(2);
        expect(modelPropGenerator.calls.length).toBe(1);
    }); 
});
