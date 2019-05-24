const { checkSchema } = require('express-validator/check');

const { Address } = require('../../models');
const { checkValidations, validUser } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        street_address_line_1: {
            in: ['params', 'body'],
            errorMessage: 'street_address_line_1 is a required field',
            trim: true,
            escape: true,
            isString: true,
            isLength: {
                errorMessage: 'street address line 1 must be at least 3 characters long',
                options: { min: 3 },
            },
        },
        street_address_line_2: {
            in: ['params', 'body'],
            errorMessage: 'invalid string',
            trim: true,
            escape: true,
            isString: true,
            optional: true,
        },
        post_office_box_number: {
            in: ['params', 'body'],
            errorMessage: 'invalid string',
            trim: true,
            escape: true,
            isString: true,
            optional: true,
        },
        city: {
            in: ['params', 'body'],
            errorMessage: 'invalid string',
            trim: true,
            escape: true,
            isString: true,
        },
        locality: {
            in: ['params', 'body'],
            errorMessage: 'invalid string',
            trim: true,
            escape: true,
            isString: true,
            optional: true,
        },
        region: {
            in: ['params', 'body'],
            errorMessage: 'invalid region/state',
            trim: true,
            escape: true,
            isString: true,
            // custom: { TODO => set a constant array of all acceptable state/regions
            //     options: validRegion
            // }
        },
        postal_code: {
            in: ['params', 'body'],
            errorMessage: 'invalid postal code',
            trim: true,
            escape: true,
            isPostalCode: { options: 'any' },
        },
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
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const {
                    street_address_line_1,
                    street_address_line_2,
                    post_office_box_number,
                    locality,
                    region,
                    postal_code,
                    user_id,
                } = req.body;
                const date = new Date();
                const address = await Address.create({
                    street_address_line_1,
                    street_address_line_2,
                    post_office_box_number,
                    locality,
                    region,
                    postal_code,
                    user_id,
                    date_created: date,
                    date_updated: date,
                });
                res.status(200).send({
                    address,
                });
            } catch (err) {
                next(err);
            }
        }
    },
};
