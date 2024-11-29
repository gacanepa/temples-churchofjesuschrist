const handleNullUndefined = value => {
  if (![null, undefined].includes(value)) {
    /*
    jssecurity:S5147:
    SonarQube: Before using any untrusted value in a MongoDB query,
    make sure it is a plain string and not an object or array.
    */
    if (typeof value !== 'object' || !Array.isArray(value)) {
      return String(value);
    }
    throw new Error('Value must be a plain string and not an object or array');
  }

  return value;
};

export default handleNullUndefined;
