export function testPropTypes(func, paramName, type) {
  switch (type) {
    case 'number':
      return () => {
        expect(() => {
          func({ paramName: null });
        }).toThrow();
        expect(() => {
          func({ paramName: undefined });
        }).toThrow();
        expect(() => {
          func({ paramName: '' });
        }).toThrow();
        expect(() => {
          func({ paramName: '1' });
        }).toThrow();
        expect(() => {
          func({ paramName: 'string' });
        }).toThrow();
        expect(() => {
          func({ paramName: () => 1 });
        }).toThrow();
      };
    case 'string':
      return () => {
        expect(() => {
          func({ paramName: null });
        }).toThrow();
        expect(() => {
          func({ paramName: undefined });
        }).toThrow();
        expect(() => {
          func({ paramName: 1 });
        }).toThrow();
        expect(() => {
          func({ paramName: 1.5 });
        }).toThrow();
        expect(() => {
          func({ paramName: () => 'string' });
        }).toThrow();
      };
  }
}
