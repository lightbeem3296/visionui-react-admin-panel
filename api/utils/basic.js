exports.isInvalid = (val) => {
  return val === null || val === undefined;
}

exports.isValid = (val) => {
  return !(val === null || val === undefined);
}

exports.timeStr = (isoTimeStr, milli) => {
  const date = new Date(isoTimeStr);
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  let hour = date.getUTCHours();
  let minute = date.getUTCMinutes();
  let second = date.getUTCSeconds();
  let milliseconds = date.getUTCMilliseconds();
  const into2digit = (dig) => {
    return `${(dig <= 9 ? '0' : '')}${dig}`;
  }
  const into3digit = (dig) => {
    return `${(dig <= 9 ? '00' : (dig <= 99 ? '0' : ''))}${dig}`;
  }
  return `${year}-${into2digit(month)}-${into2digit(day)} ${into2digit(hour)}:${into2digit(minute)}:${into2digit(second)}${milli === true ? '.' + into3digit(milliseconds) : ''}`;
}
