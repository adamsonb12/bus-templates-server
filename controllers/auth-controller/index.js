const authLocal = require('./localAuth');
const authLoginFail = require('./loginFail');
const authLoginSuccess = require('./loginSuccess');
const authLogout = require('./logout');

module.exports = {
    authLocal,
    authLoginFail,
    authLoginSuccess,
    authLogout,
};
