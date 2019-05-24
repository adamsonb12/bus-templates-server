const { checkSchema } = require('express-validator/check');

const { User } = require('../../models');
const getHash = require('../../utils/getHash');
const { checkValidations, validUser, validGender, validNewEmail } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        user_id: {
            in: ['params', 'body'],
            errorMessage: 'user_id is required and must be a valid user_id',
            isMongoId: true,
            escape: true,
            trim: true,
            custom: {
                options: validUser,
            },
        },
        options: {
            in: ['params', 'body'],
            errorMessage: 'The options object is required',
        },
        'options.name_first': {
            optional: true,
            errorMessage: 'name_first must be a valid string',
            trim: true,
            escape: true,
            isString: true,
            isLength: {
                errorMessage: 'name_first should be at least 3 characters long',
                options: { min: 3 },
            },
        },
        'options.name_last': {
            optional: true,
            errorMessage: 'name_last must be a valid string',
            trim: true,
            escape: true,
            isString: true,
            isLength: {
                errorMessage: 'name_last should be at least 3 characters long',
                options: { min: 3 },
            },
        },
        'options.name_middle': {
            optional: true,
            errorMessage: 'name_middle must be a valid string',
            trim: true,
            escape: true,
            isString: true,
        },
        'options.email': {
            optional: true,
            errorMessage: 'email must be a valid email',
            trim: true,
            escape: true,
            isEmail: true,
            custom: {
                options: validNewEmail,
            },
        },
        'options.password': {
            optional: true,
            errorMessage: 'invalid password',
            trim: true,
            isString: true,
            escape: true,
            isLength: {
                errorMessage: 'password should be at least 10 characters long',
                options: { min: 10 },
            },
        },
        'options.date_birth': {
            optional: true,
            errorMessage: 'date_of_birth must be a valid date',
            trim: true,
            escape: true,
            toDate: true,
        },
        'options.gender': {
            optional: true,
            errorMessage: 'Invalid gender',
            trim: true,
            escape: true,
            isString: true,
            custom: {
                options: validGender,
            },
        },
        'options.phone_number': {
            optional: true,
            errorMessage: 'Invalid phone number',
            isMobilePhone: true,
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { user_id, options } = req.body;
                options.date_updated = new Date();
                if (options && options.password) {
                    const protectedPassword = getHash(options.password);
                    options.password = protectedPassword;
                }
                const user = await User.findByIdAndUpdate(
                    user_id,
                    { $set: options },
                    { useFindAndModify: false, new: true }
                );
                res.status(200).send({
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
            } catch (err) {
                next(err);
            }
        }
    },
};
