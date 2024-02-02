exports.ERROR_CODE = {
  NORMAL: 0,
  AUTH: 1,
};

exports.onError = (resp, msg, err, code) => {
  console.log(err);
  console.log(msg);

  return resp.json({
    ok: false,
    code: code || this.ERROR_CODE.NORMAL,
    msg: msg,
  });
}

exports.onSuccess = (resp, data) => {
  return resp.json({
    ok: true,
    data: data,
  });
}
