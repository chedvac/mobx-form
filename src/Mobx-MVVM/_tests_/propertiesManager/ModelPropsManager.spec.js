import ModelPropsManager from 'core/ModelPropsManager';
import ModelPropBehavior from 'core/ModelPropBehavior';

import ComplexType from 'core/ComplexType';

// require.requireActual('core/PropertiesManager/ModelPropBehavior');
// require.requireActual('core/PropertiesManager/PropertiesManager');

let modelPropsManager1;
beforeEach(() => {
  modelPropsManager1 = new ModelPropsManager();
});
describe('ModelPropsManager', () => {
  test('createProperty function exist', () => {
    expect(typeof modelPropsManager1.createProperty).toBe('function');
  });
  test('setComplexProperty function exist', () => {
    expect(typeof modelPropsManager1.setComplexProperty).toBe('function');
  });
  test('setModelProp function exist', () => {
    expect(typeof modelPropsManager1.setModelProp).toBe('function');
  });

  test('reset function exist', () => {
    expect(typeof modelPropsManager1.reset).toBe('function');
  });
  test('map function exist', () => {
    expect(typeof modelPropsManager1.map).toBe('function');
  });

  describe('createProperty -', () => {
    test('call to super createProperty with new ModelPropBehavior instance', () => {
      const superCreateProperty = jest.spyOn(
        Object.getPrototypeOf(Object.getPrototypeOf(modelPropsManager1)),
        'createProperty'
      );
      modelPropsManager1.createProperty('firstName');
      expect(superCreateProperty).toHaveBeenCalledWith(
        'firstName',
        expect.any(ModelPropBehavior)
      );
      superCreateProperty.mockRestore();
    });
  });
  describe('setComplexProperty -', () => {
    beforeEach(() => {
      modelPropsManager1.createProperty('firstName');
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
    test('settings.ref should be instanceOf(ComplexType)', () => {
      expect(() => {
        modelPropsManager1.setComplexProperty('firstName', { ref: {} });
      }).toThrow();
    });
    test('apply property setRef method', () => {
      modelPropsManager1.getProperty('firstName').setRef = jest.fn();
      modelPropsManager1.setComplexProperty('firstName', {
        ref: new ComplexType()
      });
      expect(modelPropsManager1.getProperty('firstName').setRef).toBeCalled();
    });
    test('send the received ref function to setRef method', () => {
      const complexType = new ComplexType();
      modelPropsManager1.getProperty('firstName').setRef = jest.fn();
      modelPropsManager1.setComplexProperty('firstName', { ref: complexType });
      expect(modelPropsManager1.getProperty('firstName').setRef).toBeCalledWith(
        complexType
      );
    });
  });

  describe('setModelProp -', () => {
    let mockFn;
    beforeEach(() => {
      modelPropsManager1.createProperty('firstName');
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
        modelPropsManager1.setModelProp('firstName', {
          reset: {},
          map: mockFn
        });
      }).toThrow();
    });
    test('settings.map should be object', () => {
      expect(() => {
        modelPropsManager1.setModelProp('firstName', {
          reset: mockFn,
          map: {}
        });
      }).toThrow();
    });
    test('apply property setReset, setMap methods', () => {
      modelPropsManager1.getProperty('firstName').setReset = jest.fn();
      modelPropsManager1.getProperty('firstName').setMap = jest.fn();
      modelPropsManager1.setModelProp('firstName');
      expect(modelPropsManager1.getProperty('firstName').setReset).toBeCalled();
      expect(modelPropsManager1.getProperty('firstName').setMap).toBeCalled();
    });
    test('send the received settings to property methods', () => {
      const mockReset = jest.fn();
      const mockMap = jest.fn();
      modelPropsManager1.getProperty('firstName').setReset = jest.fn();
      modelPropsManager1.getProperty('firstName').setMap = jest.fn();
      modelPropsManager1.setModelProp('firstName', {
        reset: mockReset,
        map: mockMap
      });
      expect(
        modelPropsManager1.getProperty('firstName').setReset
      ).toBeCalledWith(mockReset);
      expect(modelPropsManager1.getProperty('firstName').setMap).toBeCalledWith(
        mockMap
      );
    });
  });

  describe('reset -  ', () => {
    beforeEach(() => {
      const mockReset = jest.fn();
      const mockMap = jest.fn();
      modelPropsManager1.createProperty('firstName');
      modelPropsManager1.createProperty('lastName');
      modelPropsManager1.setModelProp('firstName', {
        reset: mockReset,
        map: mockMap
      });
      modelPropsManager1.setModelProp('lastName', {
        reset: mockReset,
        map: mockMap
      });
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
    test('apply reset for all properties', () => {
      modelPropsManager1.getProperty('firstName').reset = jest.fn();
      modelPropsManager1.getProperty('lastName').reset = jest.fn();
      modelPropsManager1.reset();
      expect(modelPropsManager1.getProperty('firstName').reset).toBeCalled();
      expect(modelPropsManager1.getProperty('lastName').reset).toBeCalled();
    });
  });
  describe('map -  ', () => {
    beforeEach(() => {
      const mockReset = jest.fn();
      const mockMap = jest.fn();
      modelPropsManager1.createProperty('firstName');
      modelPropsManager1.createProperty('lastName');
      modelPropsManager1.setModelProp('firstName', {
        reset: mockReset,
        map: mockMap
      });
      modelPropsManager1.setModelProp('lastName', {
        reset: mockReset,
        map: mockMap
      });
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
    test('apply map for all properties', () => {
      modelPropsManager1.getProperty('firstName').map = jest.fn();
      modelPropsManager1.getProperty('lastName').map = jest.fn();
      modelPropsManager1.map();
      expect(modelPropsManager1.getProperty('firstName').map).toBeCalled();
      expect(modelPropsManager1.getProperty('lastName').map).toBeCalled();
    });
  });
});
