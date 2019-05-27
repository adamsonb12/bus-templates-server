const { checkSchema } = require('express-validator/check');

const { Review } = require('../../models');
const { checkValidations, validFile, validReview, validUser } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        review_id: {
            in: ['params', 'body'],
            errorMessage: 'review_id is required and must be a valid review_id',
            isMongoId: true,
            escape: true,
            trim: true,
            custom: {
                options: validReview,
            },
        },
        options: {
            in: ['params', 'body'],
            errorMessage: 'The options object is required',
        },
        'options.score': {
            in: ['params', 'body'],
            errorMessage: 'Invalid score',
            isFloat: true,
            optional: true,
            // TODO => custom sanitizer to make sure the number is only an accepted value rounded to the right place
        },
        'options.description': {
            in: ['params', 'body'],
            errorMessage: 'Invalid description',
            escape: true,
            trim: true,
            isString: true,
            isLength: {
                options: { min: 3, max: 2000 },
            },
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
        'options.file_id': {
            in: ['params', 'body'],
            errorMessage: 'file_id is required and must be a valid file_id',
            isMongoId: true,
            escape: true,
            trim: true,
            custom: {
                options: validFile,
            },
            optional: true,
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { review_id, options } = req.body;
                const review = await Review.findByIdAndUpdate(
                    review_id,
                    { $set: options },
                    { useFindAndModify: false, new: true }
                );
                res.status(200).send({ review });
            } catch (err) {
                next(err);
            }
        }
    },
};
