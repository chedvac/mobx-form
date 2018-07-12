import ModelPropsManager from '../../core/ModelPropsManager';
import PropertyBehavior from '../../core/PropertyBehavior';
import ComplexType from '../../core/ComplexType';
import validationsManagerFactory from '../../validations/validationsManager';

let modelPropsManager1;
beforeEach(() => {
  modelPropsManager1 = new ModelPropsManager();
});
describe('ModelPropsManager', () => {
  test('properties object', () => {
    expect(modelPropsManager1.properties).toBeDefined();
  });
  test('applyChildAction function exist', () => {
    expect(typeof modelPropsManager1.applyChildAction).toBe('function');
  });
  test('setComplexProperty function exist', () => {
    expect(typeof modelPropsManager1.setComplexProperty).toBe('function');
  });
  test('validate function exist', () => {
    expect(typeof modelPropsManager1.validate).toBe('function');
  });
  test('setFormObservableProperty function exist', () => {
    expect(typeof modelPropsManager1.setFormObservableProperty).toBe(
      'function'
    );
  });
  test('setModelProp function exist', () => {
    expect(typeof modelPropsManager1.setModelProp).toBe('function');
  });
  test('createProperty function exist', () => {
    expect(typeof modelPropsManager1.createProperty).toBe('function');
  });
  test('getValidationManagerProperty function exist', () => {
    expect(typeof modelPropsManager1.getValidationManagerProperty).toBe(
      'function'
    );
  });
  test('getPropertyDependencies function exist', () => {
    expect(typeof modelPropsManager1.getPropertyDependencies).toBe('function');
  });
  test('validateProperty function exist', () => {
    expect(typeof modelPropsManager1.validateProperty).toBe('function');
  });
  test('mapProperty function exist', () => {
    expect(typeof modelPropsManager1.mapProperty).toBe('function');
  });
  test('resetProperty function exist', () => {
    expect(typeof modelPropsManager1.resetProperty).toBe('function');
  });
  test('reset function exist', () => {
    expect(typeof modelPropsManager1.reset).toBe('function');
  });
  test('map function exist', () => {
    expect(typeof modelPropsManager1.map).toBe('function');
  });
  test('getProperty function exist', () => {
    expect(typeof modelPropsManager1.getProperty).toBe('function');
  });
  describe('getProperty -', () => {
    beforeEach(() => {
      modelPropsManager1.properties.firstName = new PropertyBehavior();
    });
    test('return property by name', () => {
      expect(
        modelPropsManager1.getProperty('firstName') instanceof PropertyBehavior
      ).toBeTruthy();
    });
    test('throw if property not exist', () => {
      expect(() => {
        modelPropsManager1.getProperty('lastName');
      }).toThrow();
    });
  });
  describe('getPropertyValidationState -', () => {
    beforeEach(() => {
      modelPropsManager1.properties.firstName = new PropertyBehavior();
    });
    test('return validationState of received property', () => {
      expect(
        modelPropsManager1.getPropertyValidationState('firstName')
      ).toBeDefined();
    });
    test('throw if propertyName undefined', () => {
      expect(() => {
        modelPropsManager1.getPropertyValidationState();
      }).toThrow();
    });
    test('throw if propertyName not string', () => {
      expect(() => {
        modelPropsManager1.getPropertyValidationState({});
      }).toThrow();
    });
  });
  describe('getPropertyDependencies -', () => {
    beforeEach(() => {
      modelPropsManager1.properties.firstName = new PropertyBehavior();
    });
    test('return dependedObservables of received property', () => {
      expect(
        modelPropsManager1.getPropertyDependencies('firstName')
      ).toBeDefined();
    });
    test('throw if propertyName undefined', () => {
      expect(() => {
        modelPropsManager1.getPropertyDependencies();
      }).toThrow();
    });
    test('throw if propertyName not string', () => {
      expect(() => {
        modelPropsManager1.getPropertyDependencies({});
      }).toThrow();
    });
  });
  describe('getValidationManagerProperty -', () => {
    beforeEach(() => {
      modelPropsManager1.properties.firstName = new PropertyBehavior();
    });
    test('return validationsManager of received property', () => {
      expect(
        modelPropsManager1.getValidationManagerProperty('firstName')
      ).toBeDefined();
    });
    test('throw if propertyName undefined', () => {
      expect(() => {
        modelPropsManager1.getValidationManagerProperty();
      }).toThrow();
    });
    test('throw if propertyName not string', () => {
      expect(() => {
        modelPropsManager1.getValidationManagerProperty({});
      }).toThrow();
    });
  });
  describe('validateProperty -', () => {
    beforeEach(() => {
      modelPropsManager1.properties.firstName = new PropertyBehavior();
    });
    
    test('throw if propertyName undefined', () => {
      expect(() => {
        modelPropsManager1.validateProperty();
      }).toThrow();
    });
    test('throw if propertyName not string', () => {
        expect(() => {
            modelPropsManager1.validateProperty({});
        }).toThrow();
    });
    test('newVal is optional', () => {
        expect(() => {
            modelPropsManager1.validateProperty('firstName');
        }).not.toThrow();
    });
    test('newVal should be string', () => {
        expect(() => {
            modelPropsManager1.validateProperty('firstName', {});
        }).toThrow();
    });
    test('apply property validate method if exist', () => {
        modelPropsManager1.properties.firstName.validate = jest.fn();
        modelPropsManager1.validateProperty('firstName')
        expect(modelPropsManager1.properties.firstName.validate).toBeCalled();
    });
    test('return true if property doesn\'t have validate method', () => {
        modelPropsManager1.properties.firstName.validate = undefined;
        const result = modelPropsManager1.validateProperty('firstName');
        //expect(modelPropsManager1.properties.firstName.validate).not.toBeCalled();
        expect(result).toBeTruthy();
    });
  });
  describe('mapProperty -', () => {
      beforeEach(() => {
          modelPropsManager1.properties.firstName = new PropertyBehavior();
      });

      test('throw if propertyName undefined', () => {
          expect(() => {
              modelPropsManager1.mapProperty();
          }).toThrow();
      });
      test('throw if propertyName not string', () => {
          expect(() => {
              modelPropsManager1.mapProperty({});
          }).toThrow();
      });
      test('params is optional', () => {
          expect(() => {
              modelPropsManager1.mapProperty('firstName');
          }).not.toThrow();
      });
      test('params should be object', () => {
          expect(() => {
              modelPropsManager1.mapProperty('firstName', 'str');
          }).toThrow();
      });
      test('apply property map method', () => {
          modelPropsManager1.properties.firstName.map = jest.fn();
          modelPropsManager1.mapProperty('firstName')
          expect(modelPropsManager1.properties.firstName.map).toBeCalled();
      });
      test('return property map method result', () => {
          modelPropsManager1.properties.firstName.map = jest.fn().mockReturnValue('result');
          const result = modelPropsManager1.mapProperty('firstName');
          expect(result).toEqual('result');
      });
  });
  describe('resetProperty -', () => {
      beforeEach(() => {
          modelPropsManager1.properties.firstName = new PropertyBehavior();
      });

      test('throw if propertyName undefined', () => {
          expect(() => {
              modelPropsManager1.resetProperty();
          }).toThrow();
      });
      test('throw if propertyName not string', () => {
          expect(() => {
              modelPropsManager1.resetProperty({});
          }).toThrow();
      });
      test('params is optional', () => {
          expect(() => {
              modelPropsManager1.resetProperty('firstName');
          }).not.toThrow();
      });
      test('params should be object', () => {
          expect(() => {
              modelPropsManager1.resetProperty('firstName','str');
          }).toThrow();
      });
      test('apply property reset method', () => {
          modelPropsManager1.properties.firstName.reset = jest.fn();
          modelPropsManager1.resetProperty('firstName')
          expect(modelPropsManager1.properties.firstName.reset).toBeCalled();
      });
      test('return property reset method result', () => {
          modelPropsManager1.properties.firstName.reset = jest.fn().mockReturnValue('result');
          const result = modelPropsManager1.resetProperty('firstName');
          expect(result).toEqual('result');
      });
  });
  describe('createProperty -', () => {
      beforeEach(() => {
          modelPropsManager1.createProperty('firstName');
      });
    test('throw if propertyName undefined', () => {
        expect(() => {
            modelPropsManager1.createProperty();
        }).toThrow();
    });
    test('throw if propertyName not string', () => {
        expect(() => {
            modelPropsManager1.createProperty({});
        }).toThrow();
    });
    test('throw if modelPropsManager already contains this propertyName', () => {
        expect(() => {
            modelPropsManager1.createProperty('firstName');
        }).toThrow();
    });
    test('add new property to ModelPropsManager.properties', () => {
      expect(modelPropsManager1.properties.firstName).toBeDefined();
      expect(
        modelPropsManager1.properties.firstName instanceof PropertyBehavior
      ).toBeTruthy();
    });
    test('export property on ModelPropsManager', () => {
        expect(modelPropsManager1.firstName).toBeDefined();
        expect(
            modelPropsManager1.firstName instanceof PropertyBehavior
        ).toBeTruthy();
    });
  });
  describe('setComplexProperty -', () => {
      beforeEach(() => {
          modelPropsManager1.properties.firstName = new PropertyBehavior();
      });

      test('throw if propertyName undefined', () => {
          expect(() => {
              modelPropsManager1.setComplexProperty();
          }).toThrow();
      });
      test('throw if propertyName not string', () => {
          expect(() => {
              modelPropsManager1.setComplexProperty({});
          }).toThrow();
      });
      test('settings is optional', () => {
          expect(() => {
              modelPropsManager1.setComplexProperty('firstName');
          }).not.toThrow();
      });
      test('settings should be object', () => {
          expect(() => {
              modelPropsManager1.setComplexProperty('firstName', 'str');
          }).toThrow();
      });
      test('settings.validate should be function', () => {
          expect(() => {
              modelPropsManager1.setComplexProperty('firstName', { validate: {}});
          }).toThrow();
      });
      test('apply property setValidate method', () => {
          modelPropsManager1.properties.firstName.setValidate = jest.fn();
          modelPropsManager1.setComplexProperty('firstName', { validate: jest.fn()})
          expect(modelPropsManager1.properties.firstName.setValidate).toBeCalled();
      });
      test('send the received validate function to setValidate method', () => {
          const mockFn = jest.fn();
          modelPropsManager1.properties.firstName.setValidate = jest.fn();
          modelPropsManager1.setComplexProperty('firstName', { validate: mockFn });
          expect(modelPropsManager1.properties.firstName.setValidate).toBeCalledWith(mockFn);
      });
  });
  describe('setFormObservableProperty -', () => {
      let mockFn;
      let validationsManager;
      beforeEach(() => {
          modelPropsManager1.properties.firstName = new PropertyBehavior();
          mockFn = jest.fn();
          validationsManager = new validationsManagerFactory();
      });
      test('throw if propertyName undefined', () => {
          expect(() => {
              modelPropsManager1.setFormObservableProperty();
          }).toThrow();
      });
      test('throw if propertyName not string', () => {
          expect(() => {
              modelPropsManager1.setFormObservableProperty({});
          }).toThrow();
      });
      test('settings is optional', () => {
          expect(() => {
              modelPropsManager1.setFormObservableProperty('firstName');
          }).not.toThrow();
      });
      test('settings should be object', () => {
          expect(() => {
              modelPropsManager1.setFormObservableProperty('firstName', 'str');
          }).toThrow();
      });
      test('settings.validate should be function', () => {
          expect(() => {
              modelPropsManager1.setFormObservableProperty('firstName', { validate: {}, ref: {}, validationsManager: validationsManager });
          }).toThrow();
      });
      test('settings.ref should be object', () => {

          expect(() => {
              modelPropsManager1.setFormObservableProperty('firstName', { validate: mockFn, ref: 'str', validationsManager: validationsManager });
          }).toThrow();
      });
      test('settings.validationsManager should be instanceOf validationsManagerFactory', () => {
          expect(() => {
              modelPropsManager1.setFormObservableProperty('firstName', { validate: mockFn, ref: {}, validationsManager: 'str' });
          }).toThrow();
      });
      test('apply property setRef, setValidationsManager, setValidate methods', () => {
          modelPropsManager1.properties.firstName.setRef = jest.fn();
          modelPropsManager1.properties.firstName.setValidationsManager = jest.fn();
          modelPropsManager1.properties.firstName.setValidate = jest.fn();
          modelPropsManager1.setFormObservableProperty('firstName')
          expect(modelPropsManager1.properties.firstName.setRef).toBeCalled();
          expect(modelPropsManager1.properties.firstName.setValidationsManager).toBeCalled();
          expect(modelPropsManager1.properties.firstName.setValidate).toBeCalled();
      });
      test('send the received settings to property methods', () => {
          const mockFn = jest.fn();
          modelPropsManager1.properties.firstName.setRef = jest.fn();
          modelPropsManager1.properties.firstName.setValidationsManager = jest.fn();
          modelPropsManager1.properties.firstName.setValidate = jest.fn();
          modelPropsManager1.setFormObservableProperty('firstName', { validate: mockFn, ref: {}, validationsManager: validationsManager });
          expect(modelPropsManager1.properties.firstName.setRef).toBeCalledWith({});
          expect(modelPropsManager1.properties.firstName.setValidationsManager).toBeCalledWith(validationsManager);
          expect(modelPropsManager1.properties.firstName.setValidate).toBeCalledWith(mockFn);
      });
  });
  describe('setModelProp -', () => {
      let mockFn;
      beforeEach(() => {
          modelPropsManager1.properties.firstName = new PropertyBehavior();
          mockFn = jest.fn();
      });
      test('throw if propertyName undefined', () => {
          expect(() => {
              modelPropsManager1.setModelProp();
          }).toThrow();
      });
      test('throw if propertyName not string', () => {
          expect(() => {
              modelPropsManager1.setModelProp({});
          }).toThrow();
      });
      test('settings is optional', () => {
          expect(() => {
              modelPropsManager1.setModelProp('firstName');
          }).not.toThrow();
      });
      test('settings should be object', () => {
          expect(() => {
              modelPropsManager1.setModelProp('firstName', 'str');
          }).toThrow();
      });
      test('settings.reset should be function', () => {
          expect(() => {
              modelPropsManager1.setModelProp('firstName', { reset: {}, map: mockFn });
          }).toThrow();
      });
      test('settings.map should be object', () => {
         
          expect(() => {
              modelPropsManager1.setModelProp('firstName', { reset: mockFn, map: {} });
          }).toThrow();
      });
      test('apply property setReset, setMap methods', () => {
          modelPropsManager1.properties.firstName.setReset = jest.fn();
          modelPropsManager1.properties.firstName.setMap = jest.fn();
          modelPropsManager1.setModelProp('firstName')
          expect(modelPropsManager1.properties.firstName.setReset).toBeCalled();
          expect(modelPropsManager1.properties.firstName.setMap).toBeCalled();
      });
      test('send the received settings to property methods', () => {
          const mockReset = jest.fn();
          const mockMap = jest.fn();
          modelPropsManager1.properties.firstName.setReset = jest.fn();
          modelPropsManager1.properties.firstName.setMap = jest.fn();
          modelPropsManager1.setModelProp('firstName', { reset: mockReset, map: mockMap });
          expect(modelPropsManager1.properties.firstName.setReset).toBeCalledWith(mockReset);
          expect(modelPropsManager1.properties.firstName.setMap).toBeCalledWith(mockMap);
      });
  });
  describe('validate -  ', () => {
      beforeEach(() => {
          modelPropsManager1.properties.firstName = new PropertyBehavior();
          modelPropsManager1.properties.lastName = new PropertyBehavior();
      });
      test(('return true if all properties are valid'), () => {
          modelPropsManager1.validateProperty = jest.fn().mockReturnValue(true);
          expect(modelPropsManager1.validate()).toBeTruthy();
      });
      test(('return false if a property not valid'), () => {
          modelPropsManager1.validateProperty = jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false);
          expect(modelPropsManager1.validate()).toBeFalsy();
      });
  });
  describe('reset -  ', () => {
      beforeEach(() => {
          modelPropsManager1.properties.firstName = new PropertyBehavior();
          modelPropsManager1.properties.lastName = new PropertyBehavior();
      });
      test('params is optional', () => {
          expect(() => {
              modelPropsManager1.reset();
          }).not.toThrow();
      });
      test('params should be object', () => {
          expect(() => {
              modelPropsManager1.reset('str');
          }).toThrow();
      });
      test(('apply resetProperty for all properties'), () => {
          modelPropsManager1.resetProperty = jest.fn();
          modelPropsManager1.reset();
          expect(modelPropsManager1.resetProperty.mock.calls.length).toBe(2);
          expect(mockCallback.mock.calls[0][0]).toBe('firstName');
          expect(mockCallback.mock.calls[1][0]).toBe('lastName');
      });
  });
  describe('map -  ', () => {
      beforeEach(() => {
          modelPropsManager1.properties.firstName = new PropertyBehavior();
          modelPropsManager1.properties.lastName = new PropertyBehavior();
      });
      test('params is optional', () => {
          expect(() => {
              modelPropsManager1.map();
          }).not.toThrow();
      });
      test('params should be object', () => {
          expect(() => {
              modelPropsManager1.map('str');
          }).toThrow();
      });
      test(('apply mapProperty for all properties'), () => {
          modelPropsManager1.mapProperty = jest.fn();
          modelPropsManager1.map();
          expect(modelPropsManager1.mapProperty.mock.calls.length).toBe(2);
          expect(mockCallback.mock.calls[0][0]).toBe('firstName');
          expect(mockCallback.mock.calls[1][0]).toBe('lastName');
      });
  });

});
