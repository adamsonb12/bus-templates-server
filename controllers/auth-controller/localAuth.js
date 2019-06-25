const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({ login: 'failed' });
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.status(200).send(user);
        });
    })(req, res, next);
};
