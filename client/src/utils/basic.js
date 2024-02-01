export const isValid = (val) => {
  return !(val === null || val === undefined);
}

export const isInvalid = (val) => {
  return val === null || val === undefined;
}

export const utcToLocal = (utcStr) => {
  return new Date(utcStr).toLocaleString()
}
