const { checkSchema } = require('express-validator/check');

const { File } = require('../../models');
const { checkValidations, validFile } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        file_id: {
            in: ['params', 'body'],
            errorMessage: 'file id is required and must be a valid file id',
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
                const { file_id } = req.body;
                const deletedFile = await File.findByIdAndDelete(file_id);
                if (deletedFile) {
                    res.status(200).send({ deletedFile: 'success' });
                } else {
                    res.status(400).send({ deletedFile: 'failed. File not deleted' });
                }
            } catch (err) {
                next(err);
            }
        }
    },
};
