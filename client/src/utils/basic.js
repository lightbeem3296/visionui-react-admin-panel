export function isValid(val) {
  return !(val === null || val === undefined);
}

export function isInvalid(val) {
  return val === null || val === undefined;
}
