export const stringify = (strings, ...values) => {
  return strings.map((v, i) => `${typeof v === 'string' ? v : v.reduce(((pre, val) => `${pre}${val}`), '')}${values[i] || ''}`).join('');
};

export const strings = (separator = /(\r\n|\n|\r)\s*/) => {
  return {
    replace(pattern, replacement) {
      return (strings, ...values) => stringify(strings.map(s => s.split(separator).map(s => s.replace(pattern, replacement))), ...values);
    },
    ltrim(strings, ...values) {
      return stringify(strings.map(s => s.split(separator).map(s => s.replace(/^\s*/g, ''))), ...values);
    }
  };
};

export const strs = strings();

export const values = {
};
