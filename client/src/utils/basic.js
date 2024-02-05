export const isValid = (val) => {
  return !(val === null || val === undefined);
}

export const isInvalid = (val) => {
  return val === null || val === undefined;
}

export const timeStr = (isoTimeStr) => {
  const date = new Date(isoTimeStr);
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth();
  let day = date.getUTCDay();
  let hour = date.getUTCHours();
  let minute = date.getUTCMinutes();
  let second = date.getUTCSeconds();
  const into2digit = (dig) => {
    return `${(dig <= 9 ? '0' : '')}${dig}`;
  }
  return `${year}-${into2digit(month)}-${into2digit(day)} ${into2digit(hour)}:${into2digit(minute)}:${into2digit(second)}`;
}
