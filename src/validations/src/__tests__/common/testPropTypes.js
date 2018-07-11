export function testPropTypes(func, paramName, type, params = {}) {
  switch (type) {
    case 'number':
      return () => {
        expect(() => {
          func({ [paramName]: '', ...params });
        }).toThrow();
        expect(() => {
          func({ [paramName]: '1', ...params });
        }).toThrow();
        expect(() => {
          func({ [paramName]: 'string', ...params });
        }).toThrow();
        expect(() => {
          func({ [paramName]: () => 1, ...params });
        }).toThrow();
      };
    case 'string':
      return () => {
        expect(() => {
          func({ [paramName]: 1, ...params });
        }).toThrow();
        expect(() => {
          func({ [paramName]: 1.5, ...params });
        }).toThrow();
        expect(() => {
          func({ [paramName]: () => 'string', ...params });
        }).toThrow();
      };
    case 'func':
      return () => {
        expect(() => {
          func({ [paramName]: 1, ...params });
        }).toThrow();
        expect(() => {
          func({ [paramName]: 'string', ...params });
        }).toThrow();
        expect(() => {
          func({ [paramName]: 1, ...params });
        }).toThrow();
      };
  }
}
