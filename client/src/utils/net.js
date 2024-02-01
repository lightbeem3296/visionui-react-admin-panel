import toast from "react-hot-toast";
import { isValid } from './basic';

export function handleResponse(data, okCallback, errCallback) {
  if (data.ok === true) {
    if (isValid(okCallback)) {
      okCallback(data.body);
    }
  } else if (data.ok === false) {
    if (isValid(errCallback)) {
      errCallback(data.msg);
    } else {
      toast.error(data.msg);
    }
  } else {
    console.log('unhandled error');
  }
}
