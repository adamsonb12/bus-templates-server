const { checkSchema } = require('express-validator/check');

const { File } = require('../../models');
const { checkValdations } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        file_id: {
            in: ['params', 'query'],
            trim: true,
            isMongoId: true,
        },
    }),

    action: async (req, res, next) => {
        checkValdations(req, res);
        if (!res.headersSent) {
            try {
                const { file_id } = req.query;
                const file = await File.findById(file_id);
                if (file) {
                    res.status(200).send({ file });
                } else {
                    res.status(400).send('Not Found: Invalid File Id');
                }
            } catch (err) {
                next(err);
            }
        }
    },
};
