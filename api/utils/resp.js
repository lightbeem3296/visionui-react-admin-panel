exports.onError = (resp, msg, err = null) => {
  console.log(err);
  return resp.json({
    ok: false,
    msg: msg,
  });
}

exports.onSuccess = (resp, body = null) => {
  return resp.json({
    ok: true,
    body: body,
  });
}
