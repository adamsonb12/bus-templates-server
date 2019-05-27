const { checkSchema } = require('express-validator/check');

const { Download } = require('../../models');
const { checkValidations, validFile, validUser } = require('../../utils/customValidations');

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
        file_id: {
            in: ['params', 'body'],
            errorMessage: 'file_id is required and must be a valid file_id',
            isMongoId: true,
            escape: true,
            trim: true,
            custom: {
                options: validFile,
            },
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { file_id, user_id } = req.body;
                const date = new Date();
                const download = await Download.create({
                    file_id,
                    user_id,
                    date_downloaded: date,
                });
                res.status(200).send({ download });
            } catch (err) {
                next(err);
            }
        }
    },
};
