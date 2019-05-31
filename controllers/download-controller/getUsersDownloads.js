const { checkSchema } = require('express-validator/check');

const { Download } = require('../../models');
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
                const downloads = await Download.find({ user_id });
                if (downloads) {
                    res.status(200).send({ downloads });
                } else {
                    res.status(400).send('No Downloads Found');
                }
            } catch (err) {
                next(err);
            }
        }
    },
};
