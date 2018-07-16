import PropertiesManager from '../../core/PropertiesManager';
import PropertyBehavior from '../../core/PropertyBehavior';
import ComplexType from '../../core/ComplexType';
import validationsManagerFactory from '../../validations/validationsManager';

let propertiesManager1;
beforeEach(() => {
  propertiesManager1 = new PropertiesManager();
});
describe('PropertiesManager', () => {
  test('properties object', () => {
    expect(propertiesManager1.properties).toBeDefined();
  });
  test('applyChildAction function exist', () => {
    expect(typeof propertiesManager1.applyChildAction).toBe('function');
  });
  test('setComplexProperty function exist', () => {
    expect(typeof propertiesManager1.setComplexProperty).toBe('function');
  });
  test('validate function exist', () => {
    expect(typeof propertiesManager1.validate).toBe('function');
  });
  test('setFormObservableProperty function exist', () => {
    expect(typeof propertiesManager1.setFormObservableProperty).toBe(
      'function'
    );
  });
  test('setModelProp function exist', () => {
    expect(typeof propertiesManager1.setModelProp).toBe('function');
  });
  test('createProperty function exist', () => {
    expect(typeof propertiesManager1.createProperty).toBe('function');
  });
  test('getValidationManagerProperty function exist', () => {
    expect(typeof propertiesManager1.getValidationManagerProperty).toBe(
      'function'
    );
  });
  test('getPropertyDependencies function exist', () => {
    expect(typeof propertiesManager1.getPropertyDependencies).toBe('function');
  });
  test('validateProperty function exist', () => {
    expect(typeof propertiesManager1.validateProperty).toBe('function');
  });
  test('mapProperty function exist', () => {
    expect(typeof propertiesManager1.mapProperty).toBe('function');
  });
  test('resetProperty function exist', () => {
    expect(typeof propertiesManager1.resetProperty).toBe('function');
  });
  test('reset function exist', () => {
    expect(typeof propertiesManager1.reset).toBe('function');
  });
  test('map function exist', () => {
    expect(typeof propertiesManager1.map).toBe('function');
  });
  test('getProperty function exist', () => {
    expect(typeof propertiesManager1.getProperty).toBe('function');
  });
  describe('getProperty -', () => {
    beforeEach(() => {
      propertiesManager1.properties.firstName = new PropertyBehavior();
    });
    test('return property by name', () => {
      expect(
        propertiesManager1.getProperty('firstName') instanceof PropertyBehavior
      ).toBeTruthy();
    });
    test('throw if property not exist', () => {
      expect(() => {
        propertiesManager1.getProperty('lastName');
      }).toThrow();
    });
  });
  describe('getPropertyValidationState -', () => {
    beforeEach(() => {
      propertiesManager1.properties.firstName = new PropertyBehavior();
    });
    test('return validationState of received property', () => {
      expect(
        propertiesManager1.getPropertyValidationState('firstName')
      ).toBeDefined();
    });
    test('throw if propertyName undefined', () => {
      expect(() => {
        propertiesManager1.getPropertyValidationState();
      }).toThrow();
    });
    test('throw if propertyName not string', () => {
      expect(() => {
        propertiesManager1.getPropertyValidationState({});
      }).toThrow();
    });
  });
  describe('getPropertyDependencies -', () => {
    beforeEach(() => {
      propertiesManager1.properties.firstName = new PropertyBehavior();
    });
    test('return dependedObservables of received property', () => {
      expect(
        propertiesManager1.getPropertyDependencies('firstName')
      ).toBeDefined();
    });
    test('throw if propertyName undefined', () => {
      expect(() => {
        propertiesManager1.getPropertyDependencies();
      }).toThrow();
    });
    test('throw if propertyName not string', () => {
      expect(() => {
        propertiesManager1.getPropertyDependencies({});
      }).toThrow();
    });
  });
  describe('getValidationManagerProperty -', () => {
    beforeEach(() => {
      propertiesManager1.properties.firstName = new PropertyBehavior();
    });
    test('return validationsManager of received property', () => {
      expect(
        propertiesManager1.getValidationManagerProperty('firstName')
      ).toBeDefined();
    });
    test('throw if propertyName undefined', () => {
      expect(() => {
        propertiesManager1.getValidationManagerProperty();
      }).toThrow();
    });
    test('throw if propertyName not string', () => {
      expect(() => {
        propertiesManager1.getValidationManagerProperty({});
      }).toThrow();
    });
  });
  describe('validateProperty -', () => {
    beforeEach(() => {
      propertiesManager1.properties.firstName = new PropertyBehavior();
    });
    
    test('throw if propertyName undefined', () => {
      expect(() => {
        propertiesManager1.validateProperty();
      }).toThrow();
    });
    test('throw if propertyName not string', () => {
        expect(() => {
            propertiesManager1.validateProperty({});
        }).toThrow();
    });
    test('newVal is optional', () => {
        expect(() => {
            propertiesManager1.validateProperty('firstName');
        }).not.toThrow();
    });
    test('newVal should be string', () => {
        expect(() => {
            propertiesManager1.validateProperty('firstName', {});
        }).toThrow();
    });
    test('apply property validate method if exist', () => {
        propertiesManager1.properties.firstName.validate = jest.fn();
        propertiesManager1.validateProperty('firstName')
        expect(propertiesManager1.properties.firstName.validate).toBeCalled();
    });
    test('return true if property doesn\'t have validate method', () => {
        propertiesManager1.properties.firstName.validate = undefined;
        const result = propertiesManager1.validateProperty('firstName');
        //expect(propertiesManager1.properties.firstName.validate).not.toBeCalled();
        expect(result).toBeTruthy();
    });
  });
  describe('mapProperty -', () => {
      beforeEach(() => {
          propertiesManager1.properties.firstName = new PropertyBehavior();
      });

      test('throw if propertyName undefined', () => {
          expect(() => {
              propertiesManager1.mapProperty();
          }).toThrow();
      });
      test('throw if propertyName not string', () => {
          expect(() => {
              propertiesManager1.mapProperty({});
          }).toThrow();
      });
      test('params is optional', () => {
          expect(() => {
              propertiesManager1.mapProperty('firstName');
          }).not.toThrow();
      });
      test('params should be object', () => {
          expect(() => {
              propertiesManager1.mapProperty('firstName', 'str');
          }).toThrow();
      });
      test('apply property map method', () => {
          propertiesManager1.properties.firstName.map = jest.fn();
          propertiesManager1.mapProperty('firstName')
          expect(propertiesManager1.properties.firstName.map).toBeCalled();
      });
      test('return property map method result', () => {
          propertiesManager1.properties.firstName.map = jest.fn().mockReturnValue('result');
          const result = propertiesManager1.mapProperty('firstName');
          expect(result).toEqual('result');
      });
  });
  describe('resetProperty -', () => {
      beforeEach(() => {
          propertiesManager1.properties.firstName = new PropertyBehavior();
      });

      test('throw if propertyName undefined', () => {
          expect(() => {
              propertiesManager1.resetProperty();
          }).toThrow();
      });
      test('throw if propertyName not string', () => {
          expect(() => {
              propertiesManager1.resetProperty({});
          }).toThrow();
      });
      test('params is optional', () => {
          expect(() => {
              propertiesManager1.resetProperty('firstName');
          }).not.toThrow();
      });
      test('params should be object', () => {
          expect(() => {
              propertiesManager1.resetProperty('firstName','str');
          }).toThrow();
      });
      test('apply property reset method', () => {
          propertiesManager1.properties.firstName.reset = jest.fn();
          propertiesManager1.resetProperty('firstName')
          expect(propertiesManager1.properties.firstName.reset).toBeCalled();
      });
      test('return property reset method result', () => {
          propertiesManager1.properties.firstName.reset = jest.fn().mockReturnValue('result');
          const result = propertiesManager1.resetProperty('firstName');
          expect(result).toEqual('result');
      });
  });
  describe('createProperty -', () => {
      beforeEach(() => {
          propertiesManager1.createProperty('firstName');
      });
    test('throw if propertyName undefined', () => {
        expect(() => {
            propertiesManager1.createProperty();
        }).toThrow();
    });
    test('throw if propertyName not string', () => {
        expect(() => {
            propertiesManager1.createProperty({});
        }).toThrow();
    });
    test('throw if propertiesManager already contains this propertyName', () => {
        expect(() => {
            propertiesManager1.createProperty('firstName');
        }).toThrow();
    });
    test('add new property to PropertiesManager.properties', () => {
      expect(propertiesManager1.properties.firstName).toBeDefined();
      expect(
        propertiesManager1.properties.firstName instanceof PropertyBehavior
      ).toBeTruthy();
    });
    test('export property on PropertiesManager', () => {
        expect(propertiesManager1.firstName).toBeDefined();
        expect(
            propertiesManager1.firstName instanceof PropertyBehavior
        ).toBeTruthy();
    });
  });
  describe('setComplexProperty -', () => {
      beforeEach(() => {
          propertiesManager1.properties.firstName = new PropertyBehavior();
      });

      test('throw if propertyName undefined', () => {
          expect(() => {
              propertiesManager1.setComplexProperty();
          }).toThrow();
      });
      test('throw if propertyName not string', () => {
          expect(() => {
              propertiesManager1.setComplexProperty({});
          }).toThrow();
      });
      test('settings is optional', () => {
          expect(() => {
              propertiesManager1.setComplexProperty('firstName');
          }).not.toThrow();
      });
      test('settings should be object', () => {
          expect(() => {
              propertiesManager1.setComplexProperty('firstName', 'str');
          }).toThrow();
      });
      test('settings.validate should be function', () => {
          expect(() => {
              propertiesManager1.setComplexProperty('firstName', { validate: {}});
          }).toThrow();
      });
      test('apply property setValidate method', () => {
          propertiesManager1.properties.firstName.setValidate = jest.fn();
          propertiesManager1.setComplexProperty('firstName', { validate: jest.fn()})
          expect(propertiesManager1.properties.firstName.setValidate).toBeCalled();
      });
      test('send the received validate function to setValidate method', () => {
          const mockFn = jest.fn();
          propertiesManager1.properties.firstName.setValidate = jest.fn();
          propertiesManager1.setComplexProperty('firstName', { validate: mockFn });
          expect(propertiesManager1.properties.firstName.setValidate).toBeCalledWith(mockFn);
      });
  });
  describe('setFormObservableProperty -', () => {
      let mockFn;
      let validationsManager;
      beforeEach(() => {
          propertiesManager1.properties.firstName = new PropertyBehavior();
          mockFn = jest.fn();
          validationsManager = new validationsManagerFactory();
      });
      test('throw if propertyName undefined', () => {
          expect(() => {
              propertiesManager1.setFormObservableProperty();
          }).toThrow();
      });
      test('throw if propertyName not string', () => {
          expect(() => {
              propertiesManager1.setFormObservableProperty({});
          }).toThrow();
      });
      test('settings is optional', () => {
          expect(() => {
              propertiesManager1.setFormObservableProperty('firstName');
          }).not.toThrow();
      });
      test('settings should be object', () => {
          expect(() => {
              propertiesManager1.setFormObservableProperty('firstName', 'str');
          }).toThrow();
      });
      test('settings.validate should be function', () => {
          expect(() => {
              propertiesManager1.setFormObservableProperty('firstName', { validate: {}, ref: {}, validationsManager: validationsManager });
          }).toThrow();
      });
      test('settings.ref should be object', () => {

          expect(() => {
              propertiesManager1.setFormObservableProperty('firstName', { validate: mockFn, ref: 'str', validationsManager: validationsManager });
          }).toThrow();
      });
      test('settings.validationsManager should be instanceOf validationsManagerFactory', () => {
          expect(() => {
              propertiesManager1.setFormObservableProperty('firstName', { validate: mockFn, ref: {}, validationsManager: 'str' });
          }).toThrow();
      });
      test('apply property setRef, setValidationsManager, setValidate methods', () => {
          propertiesManager1.properties.firstName.setRef = jest.fn();
          propertiesManager1.properties.firstName.setValidationsManager = jest.fn();
          propertiesManager1.properties.firstName.setValidate = jest.fn();
          propertiesManager1.setFormObservableProperty('firstName')
          expect(propertiesManager1.properties.firstName.setRef).toBeCalled();
          expect(propertiesManager1.properties.firstName.setValidationsManager).toBeCalled();
          expect(propertiesManager1.properties.firstName.setValidate).toBeCalled();
      });
      test('send the received settings to property methods', () => {
          const mockFn = jest.fn();
          propertiesManager1.properties.firstName.setRef = jest.fn();
          propertiesManager1.properties.firstName.setValidationsManager = jest.fn();
          propertiesManager1.properties.firstName.setValidate = jest.fn();
          propertiesManager1.setFormObservableProperty('firstName', { validate: mockFn, ref: {}, validationsManager: validationsManager });
          expect(propertiesManager1.properties.firstName.setRef).toBeCalledWith({});
          expect(propertiesManager1.properties.firstName.setValidationsManager).toBeCalledWith(validationsManager);
          expect(propertiesManager1.properties.firstName.setValidate).toBeCalledWith(mockFn);
      });
  });
  describe('setModelProp -', () => {
      let mockFn;
      beforeEach(() => {
          propertiesManager1.properties.firstName = new PropertyBehavior();
          mockFn = jest.fn();
      });
      test('throw if propertyName undefined', () => {
          expect(() => {
              propertiesManager1.setModelProp();
          }).toThrow();
      });
      test('throw if propertyName not string', () => {
          expect(() => {
              propertiesManager1.setModelProp({});
          }).toThrow();
      });
      test('settings is optional', () => {
          expect(() => {
              propertiesManager1.setModelProp('firstName');
          }).not.toThrow();
      });
      test('settings should be object', () => {
          expect(() => {
              propertiesManager1.setModelProp('firstName', 'str');
          }).toThrow();
      });
      test('settings.reset should be function', () => {
          expect(() => {
              propertiesManager1.setModelProp('firstName', { reset: {}, map: mockFn });
          }).toThrow();
      });
      test('settings.map should be object', () => {
         
          expect(() => {
              propertiesManager1.setModelProp('firstName', { reset: mockFn, map: {} });
          }).toThrow();
      });
      test('apply property setReset, setMap methods', () => {
          propertiesManager1.properties.firstName.setReset = jest.fn();
          propertiesManager1.properties.firstName.setMap = jest.fn();
          propertiesManager1.setModelProp('firstName')
          expect(propertiesManager1.properties.firstName.setReset).toBeCalled();
          expect(propertiesManager1.properties.firstName.setMap).toBeCalled();
      });
      test('send the received settings to property methods', () => {
          const mockReset = jest.fn();
          const mockMap = jest.fn();
          propertiesManager1.properties.firstName.setReset = jest.fn();
          propertiesManager1.properties.firstName.setMap = jest.fn();
          propertiesManager1.setModelProp('firstName', { reset: mockReset, map: mockMap });
          expect(propertiesManager1.properties.firstName.setReset).toBeCalledWith(mockReset);
          expect(propertiesManager1.properties.firstName.setMap).toBeCalledWith(mockMap);
      });
  });
  describe('validate -  ', () => {
      beforeEach(() => {
          propertiesManager1.properties.firstName = new PropertyBehavior();
          propertiesManager1.properties.lastName = new PropertyBehavior();
      });
      test(('return true if all properties are valid'), () => {
          propertiesManager1.validateProperty = jest.fn().mockReturnValue(true);
          expect(propertiesManager1.validate()).toBeTruthy();
      });
      test(('return false if a property not valid'), () => {
          propertiesManager1.validateProperty = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false);
          expect(propertiesManager1.validate()).toBeFalsy();
      });
  });
  describe('reset -  ', () => {
      beforeEach(() => {
          propertiesManager1.properties.firstName = new PropertyBehavior();
          propertiesManager1.properties.lastName = new PropertyBehavior();
      });
      test('params is optional', () => {
          expect(() => {
              propertiesManager1.reset();
          }).not.toThrow();
      });
      test('params should be object', () => {
          expect(() => {
              propertiesManager1.reset('str');
          }).toThrow();
      });
      test(('apply resetProperty for all properties'), () => {
          propertiesManager1.resetProperty = jest.fn();
          propertiesManager1.reset();
          expect(propertiesManager1.resetProperty.mock.calls.length).toBe(2);
          expect(mockCallback.mock.calls[0][0]).toBe('firstName');
          expect(mockCallback.mock.calls[1][0]).toBe('lastName');
      });
  });
  describe('map -  ', () => {
      beforeEach(() => {
          propertiesManager1.properties.firstName = new PropertyBehavior();
          propertiesManager1.properties.lastName = new PropertyBehavior();
      });
      test('params is optional', () => {
          expect(() => {
              propertiesManager1.map();
          }).not.toThrow();
      });
      test('params should be object', () => {
          expect(() => {
              propertiesManager1.map('str');
          }).toThrow();
      });
      test(('apply mapProperty for all properties'), () => {
          propertiesManager1.mapProperty = jest.fn();
          propertiesManager1.map();
          expect(propertiesManager1.mapProperty.mock.calls.length).toBe(2);
          expect(mockCallback.mock.calls[0][0]).toBe('firstName');
          expect(mockCallback.mock.calls[1][0]).toBe('lastName');
      });
  });

});
