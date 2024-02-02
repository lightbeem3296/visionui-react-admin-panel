import toast from "react-hot-toast";
import { isValid } from './basic';

export const ERROR_CODE = {
  NORMAL: 0,
  AUTH: 1,
};

export const handleResponse = (axiosResponce, okCallback, errCallback) => {
  let data = axiosResponce.data;
  if (data.ok === true) {
    if (isValid(okCallback)) {
      return okCallback(data.data);
    }
  } else if (data.ok === false) {
    if (isValid(errCallback)) {
      return errCallback(data.msg, data.code);
    } else {
      toast.error(data.msg);
    }
  } else {
    console.log('unhandled error');
  }
  return null;
}

export const goToUrl = (urlStr) => {
  window.location.href = urlStr;
}
