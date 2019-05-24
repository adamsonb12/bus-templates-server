const { checkSchema } = require('express-validator/check');

const { Address } = require('../../models');
const { checkValidations, validAddress } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        address_id: {
            in: ['params', 'body'],
            errorMessage: 'address_id is required and must be a valid address_id',
            isMongoId: true,
            escape: true,
            trim: true,
            custom: {
                options: validAddress,
            },
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { address_id } = req.body;
                const deletedAddress = await Address.findByIdAndDelete(address_id);
                if (deletedAddress) {
                    res.status(200).send({ deleteAddress: 'success' });
                } else {
                    res.status(400).send({ deleteAddress: 'failed. Invalid address id' });
                }
            } catch (err) {
                next(err);
            }
        }
    },
};
