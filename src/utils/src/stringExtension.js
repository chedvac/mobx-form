export const format = function(source, params) {
  //eslint-disable-line complexity
  if (typeof source !== 'string') {
    // formExceptions.throwFormError('invalid source or source is missing');
  }

  if (typeof params === 'object') {
    // formExceptions.throwFormError('invalid params');
  }

  if (arguments.length === 1) {
    return source;
  }
  if (arguments.length > 2 && params.constructor !== Array) {
    params = Array.from(arguments).slice(1);
  }
  if (params !== undefined) {
    if (params.constructor !== Array) {
      params = [params];
    }
    params.forEach((n, i) => {
      source = source.replace(new RegExp('\\{' + i + '\\}', 'g'), function() {
        return n;
      });
    });
  }
  return source;
};
