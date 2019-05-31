const { checkSchema } = require('express-validator/check');

const { Download, File } = require('../../models');
const { checkValidations } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        file_id: {
            in: ['params', 'query'],
            trim: true,
            isMongoId: true,
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { file_id } = req.query;
                const file = await File.findById(file_id);
                const downloads = await Download.find({ file_id });
                const downloads_count = downloads.length || 0;
                if (file) {
                    res.status(200).send({ file, downloads_count });
                } else {
                    res.status(400).send('Not Found: Invalid File Id');
                }
            } catch (err) {
                next(err);
            }
        }
    },
};
