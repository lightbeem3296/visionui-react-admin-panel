// Checks if val is null or undefined.
exports.isInvalid = (val) => {
  return val === null || val === undefined;
}

// Checks if val is null or undefined.
exports.isValid = (val) => {
  return !(val === null || val === undefined);
}
