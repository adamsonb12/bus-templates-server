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
            return res.status(200).send({
                user: {
                    id: user._id,
                    date_birth: user.date_birth,
                    email: user.email,
                    gender: user.gender,
                    name_first: user.name_first,
                    name_last: user.name_last,
                    name_middle: user.name_middle,
                    phone_number: user.phone_number,
                    date_created: user.date_created,
                    date_updated: user.date_updated,
                },
            });
        });
    })(req, res, next);
};
