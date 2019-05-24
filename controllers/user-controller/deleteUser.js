const { checkSchema } = require('express-validator/check');

const { User } = require('../../models');
const { checkValidations, validUser } = require('../../utils/customValidations');

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
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { user_id } = req.body;
                const deletedUser = await User.findByIdAndDelete(user_id);
                if (deletedUser) {
                    res.status(200).send({ deleteUser: 'success' });
                } else {
                    res.status(400).send({ deleteUser: 'failed. Invalid user id' });
                }
            } catch (err) {
                next(err);
            }
        }
    },
};
