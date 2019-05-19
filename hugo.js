require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const passport = require('passport');
// const session = require('express-session');
// const routes = require('./controllers/routes');
// require('./services/passport');

module.exports = () => {
    mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        const hugo = express();

        hugo.use(express.json());
        hugo.use(express.urlencoded({ extended: true }));

        // hugo.use(session({ secret: process.env.SESSION_SECRET }));
        // hugo.use(passport.initialize());
        // hugo.use(passport.session());

        hugo.get('/', (req, res) => {
            res.send({ hello: 'there' });
        });

        // routes(hugo);

        hugo.listen(process.env.PORT || 5000);
    });
};
