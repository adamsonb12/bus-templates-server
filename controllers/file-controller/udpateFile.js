const { checkSchema } = require('express-validator/check');

const { File } = require('../../models');
const { checkValidations, validUser, validFile, validFileCategory } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        file_id: {
            in: ['params', 'body'],
            errorMessage: 'file_id is required',
            isMongoId: true,
            escape: true,
            trim: true,
            custom: {
                validFile,
            },
        },
        options: {
            in: ['params', 'body'],
            errorMessage: 'The options object is required',
        },
        'options.title': {
            in: ['params', 'body'],
            errorMessage: 'invalid title',
            trim: true,
            escape: true,
            isString: true,
            isLength: {
                errorMessage: 'title must be at least 2 characters long',
                options: { min: 2 },
            },
            optional: true,
        },
        'options.description': {
            in: ['params', 'body'],
            errorMessage: 'invalid description',
            trim: true,
            escape: true,
            isString: true,
            optional: true,
        },
        'options.source_url': {
            in: ['params', 'body'],
            errorMessage: 'invalid source_url',
            trim: true,
            isURL: true,
            optional: true,
        },
        'options.user_id': {
            in: ['params', 'body'],
            errorMessage: 'user_id is required and must be a valid user_id',
            isMongoId: true,
            escape: true,
            trim: true,
            custom: {
                options: validUser,
            },
            optional: true,
        },
        'options.category_id': {
            in: ['params', 'body'],
            errorMessage: 'category_id is required and must be a valid category_id',
            isMongoId: true,
            escape: true,
            trim: true,
            custom: {
                options: validFileCategory,
            },
            optional: true,
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { file_id, options } = req.body;
                options.date_updated = new Date();
                const file = await File.findByIdAndUpdate(
                    file_id,
                    { $set: options },
                    { useFindAndModify: false, new: true }
                );
                res.status(200).send({ file });
            } catch (err) {
                next(err);
            }
        }
    },
};
