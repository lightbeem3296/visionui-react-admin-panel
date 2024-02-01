exports.onError = (resp, msg, err = null) => {
  console.log(err);
  console.log(msg);
  return resp.json({
    ok: false,
    msg: msg,
  });
}

exports.onSuccess = (resp, body) => {
  return resp.json({
    ok: true,
    body: body,
  });
}
