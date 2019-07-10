const { checkSchema } = require('express-validator/check');

const { User } = require('../../models');
const { checkValidations } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        user_id: {
            in: ['params', 'query'],
            trim: true,
            isMongoId: true,
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { user_id } = req.query;
                const user = await User.findById(user_id);
                if (user) {
                    // TODO => return less if not same user from session
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
                } else {
                    res.status(404).send('Not Found: Invalid user id');
                }
            } catch (err) {
                next(err);
            }
        }
    },
};
