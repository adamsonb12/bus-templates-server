const passport = require('passport');

module.exports = passport.authenticate('local', { 
    successRedirect: '/login_success', 
    failureRedirect: '/login_fail'
});

