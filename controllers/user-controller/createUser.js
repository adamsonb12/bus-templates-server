const { checkSchema } = require('express-validator/check');

const { User } = require('../../models');
const getHash = require('../../utils/getHash');
const { checkValidations, validGender, validNewEmail } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        email: {
            in: ['params', 'body'],
            errorMessage: 'email is required and must be a valid email address',
            trim: true,
            isEmail: true,
            escape: true,
            custom: {
                options: validNewEmail,
            },
        },
        name_first: {
            in: ['params', 'body'],
            errorMessage: 'name_first is required',
            trim: true,
            escape: true,
            isString: true,
            isLength: {
                errorMessage: 'name_first should be at least 3 characters long',
                options: { min: 3 },
            },
        },
        name_last: {
            in: ['params', 'body'],
            errorMessage: 'name_last is required',
            trim: true,
            escape: true,
            isString: true,
            isLength: {
                errorMessage: 'name_last should be at least 3 characters long',
                options: { min: 3 },
            },
        },
        date_birth: {
            in: ['params', 'body'],
            errorMessage: 'date_birth is required',
            toDate: true,
            trim: true,
            escape: true,
            optional: true,
        },
        name_middle: {
            in: ['params', 'body'],
            errorMessage: 'name_middle is required',
            trim: true,
            isString: true,
            escape: true,
            optional: true,
        },
        gender: {
            in: ['params', 'body'],
            errorMessage: 'Invalid gender string or value',
            trim: true,
            escape: true,
            isString: true,
            custom: {
                options: validGender,
            },
        },
        password: {
            in: ['params', 'body'],
            errorMessage: 'password is required',
            trim: true,
            isString: true,
            escape: true,
            isLength: {
                errorMessage: 'password should be at least 8 characters long',
                options: { min: 8 },
            },
        },
        phone_number: {
            in: ['params', 'body'],
            errorMessage: 'must be a valid phone number',
            optional: true,
            isMobilePhone: true,
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const {
                    date_birth,
                    email,
                    gender,
                    name_first,
                    name_last,
                    name_middle,
                    password,
                    phone_number,
                } = req.body;
                const date = new Date();
                const protectedPassword = getHash(password);
                const newUser = await User.create({
                    date_birth,
                    email,
                    gender,
                    name_first,
                    name_last,
                    name_middle,
                    password: protectedPassword,
                    phone_number,
                    date_created: date,
                    date_updated: date,
                });
                res.status(200).send({
                    user: {
                        id: newUser._id,
                        date_birth: newUser.date_birth,
                        email: newUser.email,
                        gender: newUser.gender,
                        name_first: newUser.name_first,
                        name_last: newUser.name_last,
                        name_middle: newUser.name_middle,
                        phone_number: newUser.phone_number,
                        date_created: newUser.date_created,
                        date_updated: newUser.date_updated,
                    },
                });
            } catch (err) {
                next(err);
            }
        }
    },
};
