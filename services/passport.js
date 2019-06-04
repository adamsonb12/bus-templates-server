const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const getHash = require('../utils/getHash');
const { User } = require('../models');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (e) {
        return done(e, null);
    }
});

passport.use(
    new LocalStrategy({ usernameField: 'email' }, async function(email, password, done) {
        try {
            const user = await User.findOne({ email });
            const hashedPassword = getHash(password);
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const validPassword = user.password && hashedPassword && user.password === hashedPassword;
            if (!validPassword) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (e) {
            done(e, null);
        }
    })
);

module.exports = passport;
