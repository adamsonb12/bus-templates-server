const { checkSchema } = require('express-validator/check');

const { File } = require('../../models');
const { checkValidations, validUser } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        user_id: {
            in: ['params', 'query'],
            trim: true,
            isMongoId: true,
            custom: {
                options: validUser,
            },
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { user_id } = req.query;
                const files = await File.find({ user_id });
                if (files) {
                    res.status(200).send({ files });
                } else {
                    res.status(400).send('No Files Found');
                }
            } catch (err) {
                next(err);
            }
        }
    },
};
