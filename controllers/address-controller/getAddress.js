const { checkSchema } = require('express-validator/check');

const { Address } = require('../../models');
const { checkValidations } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        address_id: {
            in: ['params', 'query'],
            trim: true,
            isMongoId: true,
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { address_id } = req.query;
                const address = await Address.findById(address_id);
                if (address) {
                    res.status(200).send({
                        address,
                    });
                } else {
                    res.status(404).send('Not Found: Invalid address id');
                }
            } catch (err) {
                next(err);
            }
        }
    },
};
