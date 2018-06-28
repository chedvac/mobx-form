import ValidationsManager from "../../validations/validationsManager";
import PropertiesManager from "../../core/PropertiesManager";
import * as complexPropertiesRegistration from "../../core/complexPropertiesRegistration";
import ComplexTab from "../mocks/ComplexTab";
import { hebrewName } from "../../validations/languages";

let customTab;
const settings = { validations: [hebrewName({ message: "hebrew only" })] };
beforeEach(() => {
  customTab = new ComplexTab();
});
describe("ComplexType", () => {
  describe("define properties:", () => {
    test("validationState", () => {
      expect(customTab.validationState).toBeDefined();
    });
    describe("validationsManager", () => {
      test("is instanceof validationsManagerFactory", () => {
        expect(customTab.validationsManager instanceof ValidationsManager).toBe(
          true
        );
      });
      test("validationsManagerFactory constructor call with settings.validations that passed to ComplexType constructor", () => {
        // jest.mock("../../validations/validationsManager", () =>
        //   jest.fn().mockImplementation(() => {})
        // );
        jest.mock(("../../validations/validationsManager");
        customTab = new ComplexTab();

        expect(ValidationsManager.mock.calls[0]).toBeCalledWith(
          settings.validations
        );
      });
    });
    test("propertiesManager", () => {
      expect(customTab.propertiesManager instanceof PropertiesManager).toBe(
        true
      );
    });
    test("propertiesManager", () => {
      expect(customTab.propertiesManager instanceof PropertiesManager).toBe(
        true
      );
    });
  });
  describe("ComplexType constructor should call initializeProperties", () => {
    beforeEach(() => {
      complexPropertiesRegistration.initializeProperties = jest.fn(() => true);
      customTab = new ComplexTab();
    });
    test("initializeProperties called", () => {
      expect(
        complexPropertiesRegistration.initializeProperties.mock.calls.length
      ).toBe(2);
    });
    describe("with params", () => {
      test("complecType", () => {
        expect(
          complexPropertiesRegistration.initializeProperties.mock.calls[0][0]
        ).toBe(customTab);
        expect(
          complexPropertiesRegistration.initializeProperties.mock.calls[1][0]
        ).toBe(customTab.complex);
      });
      test("_properties", () => {
        expect(
          complexPropertiesRegistration.initializeProperties.mock.calls[0][1]
        ).toBe(customTab._properties);
        expect(
          complexPropertiesRegistration.initializeProperties.mock.calls[1][1]
        ).toBe(customTab.complex._properties);
      });
    });
  });
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
  // describe("validate - validate complex and all childs", () => {
  //   describe("validate complex", () => {
  //     test("call validations fail - update message and isValid", () => {
  //       customTab.validate();
  //       customTab.firstName = "";
  //       expect(customTab.validationState.message).toBe("not valid");
  //       expect(customTab.validationState.isValid).toBeFalsy();
  //     });
  //     test("call validations sucsses", () => {
  //       customTab.firstName = "yael";
  //       customTab.validate();
  //       expect(customTab.validationState.message).toBe("");
  //       expect(customTab.validationState.isValid).toBeTruthy();
  //     });
  //   });
  //   describe("validate child and update isValid by result", () => {
  //     test("validations fail - update message and isValid", () => {
  //       customTab.validate();
  //       expect(customTab.validationState.message).toBe("not valid");
  //       expect(customTab.validationState.isValid).toBeFalsy();
  //     });
  //     test("validations sucsses", () => {
  //       customTab.firstName = "";
  //       customTab.validate();
  //       expect(customTab.validationState.message).toBe("");
  //       expect(customTab.validationState.isValid).toBeTruthy();
  //     });
  //   });
  // });
  // describe("call registerComplexProperties after propeties constructor called - add complex behavior to propertiesManager, ", () => {
  //   test("before call registerComplexProperties - propertiesManager not have validate function of complex", () => {
  //     expect(
  //       customTab.propertiesManager.properties.complex.validate
  //     ).not.toBeDefined();
  //   });
  //   test("after call registerComplexProperties -propertiesManager complex validate function is define", () => {
  //     customTab = new ComplexTab(true);
  //     expect(
  //       customTab.propertiesManager.properties.complex.validate
  //     ).toBeDefined();
  //   });
  // });
});
