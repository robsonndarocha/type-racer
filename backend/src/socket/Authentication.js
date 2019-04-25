const R = require('ramda');

const authentication = (packet, next, token) => {
  const received = R.pipe(R.find(R.prop('token')), R.values, R.head)(packet);

  const verify = R.ifElse(R.equals, R.always(null), R.always(new Error('Authentication Error')))(token);

  console.log(received, token, verify(received));

  return next(verify(received));
}

module.exports = authentication;
