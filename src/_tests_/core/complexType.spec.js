import validationsManagerFactory from "../../validations/validationsManager";
import PropertiesManager from "../../core/PropertiesManager";
import ComplexTab from "../mocks/ComplexTab";
let customTab;

beforeEach(() => {
  customTab = new ComplexTab();
  customTab.propertiesManager.setProperty = jest.fn(
    (propertyName, settings) => true
  );
});
describe("ComplexType", () => {
  describe("define properties:", () => {
    test("message", () => {
      expect(customTab.message).toBe("");
    });
    test("isValid", () => {
      expect(customTab.isValid).toBe(true);
    });
    test("validationsManager", () => {
      expect(
        customTab.validationsManager instanceof validationsManagerFactory
      ).toBe(true);
    });
    test("propertiesManager", () => {
      expect(customTab.propertiesManager instanceof PropertiesManager).toBe(
        true
      );
    });
  });
  // describe('should call initializeInstance - set all properties in propertiesManager', ()=>{
  //     test('set formObservable' , ()=>{
  //         expect(customTab.propertiesManager.setProperty).toBeCalledWith('firstName');
  //     });
  //     test('set modelProp' , ()=>{
  //         expect(customTab.propertiesManager.setProperty).toBeCalledWith();
  //     });
  // });
  // describe('initialProperty - add property to propertiesManager', ()=>{

  //     test('set new property' , ()=>{
  //         const set = ()=>{return true}
  //         customTab.initialProperty('name', {set});
  //         expect(customTab.propertiesManager.properties.name).toBeDefined();
  //         expect(customTab.propertiesManager.properties.name.set).toBe(set);
  //     });
  //     test('update exist property' , ()=>{
  //         const set = ()=>{return true}
  //         customTab.initialProperty('firstName', {set});
  //         expect(customTab.propertiesManager.properties.firstName).toBeDefined();
  //         expect(customTab.propertiesManager.properties.firstName.ref).toBeDefined();
  //         expect(customTab.propertiesManager.properties.firstName.set).toBe(set);
  //     });
  // });
  // describe('setValidations', ()=>{
  //     test('- add validations to its validationsManager after initilize' , ()=>{
  //         expect(customTab.validationsManager.validations.length).toBe(1);
  //         customTab.setValidations([{
  //             validator: ()=> true,
  //             message: 'not valid'
  //         }]);
  //         expect(customTab.validationsManager.validations.length).toBe(2);
  //     });
  // });
  describe("validate - validate complex and all childs", () => {
    describe("validate complex", () => {
      test("call validations fail - update message and isValid", () => {
        customTab.validate();
        customTab.firstName = "";
        expect(customTab.validationState.message).toBe("not valid");
        expect(customTab.validationState.isValid).toBeFalsy();
      });
      test("call validations sucsses", () => {
        customTab.firstName = "yael";
        customTab.validate();
        expect(customTab.validationState.message).toBe("");
        expect(customTab.validationState.isValid).toBeTruthy();
      });
    });
    describe("validate child and update isValid by result", () => {
      test("validations fail - update message and isValid", () => {
        customTab.validate();
        expect(customTab.validationState.message).toBe("not valid");
        expect(customTab.validationState.isValid).toBeFalsy();
      });
      test("validations sucsses", () => {
        customTab.firstName = "";
        customTab.validate();
        expect(customTab.validationState.message).toBe("");
        expect(customTab.validationState.isValid).toBeTruthy();
      });
    });
  });
  describe("call registerComplexProperties after propeties constructor called - add complex behavior to propertiesManager, ", () => {
    test("before call registerComplexProperties - propertiesManager not have validate function of complex", () => {
      expect(
        customTab.propertiesManager.properties.complex.validate
      ).not.toBeDefined();
    });
    test("after call registerComplexProperties -propertiesManager complex validate function is define", () => {
      customTab = new ComplexTab(true);
      expect(
        customTab.propertiesManager.properties.complex.validate
      ).toBeDefined();
    });
  });
});
