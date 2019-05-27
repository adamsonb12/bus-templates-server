const { checkSchema } = require('express-validator/check');

const { Download } = require('../../models');
const { checkValidations } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        download_id: {
            in: ['params', 'query'],
            trim: true,
            isMongoId: true,
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { download_id } = req.query;
                const download = await Download.findById(download_id);
                if (download) {
                    res.status(200).send({ download });
                } else {
                    res.status(404).send('Not Found: Invalid download id');
                }
            } catch (err) {
                next(err);
            }
        }
    },
};
