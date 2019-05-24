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
        options: {
            in: ['params', 'body'],
            errorMessage: 'The options object is required',
        },
        'options.street_address_line_2': {
            in: ['params', 'body'],
            errorMessage: 'invalid string',
            trim: true,
            escape: true,
            isString: true,
            optional: true,
        },
        'options.post_office_box_number': {
            in: ['params', 'body'],
            errorMessage: 'invalid string',
            trim: true,
            escape: true,
            isString: true,
            optional: true,
        },
        'options.city': {
            in: ['params', 'body'],
            errorMessage: 'invalid string',
            trim: true,
            escape: true,
            isString: true,
            optional: true,
        },
        'options.locality': {
            in: ['params', 'body'],
            errorMessage: 'invalid string',
            trim: true,
            escape: true,
            isString: true,
            optional: true,
        },
        'options.region': {
            in: ['params', 'body'],
            errorMessage: 'invalid region/state',
            trim: true,
            escape: true,
            isString: true,
            optional: true,
            // custom: { TODO => set a constant array of all acceptable state/regions
            //     options: validRegion
            // }
        },
        'options.postal_code': {
            in: ['params', 'body'],
            errorMessage: 'invalid postal code',
            trim: true,
            escape: true,
            isPostalCode: { options: 'any' },
            optional: true,
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { address_id, options } = req.body;
                options.date_updated = new Date();
                const address = await Address.findByIdAndUpdate(
                    address_id,
                    { $set: options },
                    { useFindAndModify: false, new: true }
                );
                res.status(200).send({ address });
            } catch (err) {
                next(err);
            }
        }
    },
};
