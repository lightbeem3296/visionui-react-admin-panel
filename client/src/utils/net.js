import toast from "react-hot-toast";
import { isValid } from './basic';

export function handleResponse(axiosResponce, okCallback, errCallback) {
  let data = axiosResponce.data;
  if (data.ok === true) {
    if (isValid(okCallback)) {
      return okCallback(data.body);
    }
  } else if (data.ok === false) {
    if (isValid(errCallback)) {
      return errCallback(data.msg);
    } else {
      toast.error(data.msg);
    }
  } else {
    console.log('unhandled error');
  }
  return null;
}
