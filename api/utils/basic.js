exports.isInvalid = (val) => {
  return val === null || val === undefined;
}

exports.isValid = (val) => {
  return !(val === null || val === undefined);
}
