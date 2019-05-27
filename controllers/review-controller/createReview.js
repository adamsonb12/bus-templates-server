const { checkSchema } = require('express-validator/check');

const { Review } = require('../../models');
const { checkValidations, validFile, validUser } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        score: {
            in: ['params', 'body'],
            errorMessage: 'Invalid score',
            isFloat: true,
            // TODO => custom sanitizer to make sure the number is only an accepted value rounded to the right place
        },
        description: {
            in: ['params', 'body'],
            errorMessage: 'Invalid description',
            escape: true,
            trim: true,
            isString: true,
            isLength: {
                options: { min: 3, max: 2000 },
            },
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
        file_id: {
            in: ['params', 'body'],
            errorMessage: 'file_id is required and must be a valid file_id',
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
                const { score, description, file_id, user_id } = req.body;
                const date = new Date();
                const review = await Review.create({
                    score,
                    description,
                    file_id,
                    user_id,
                    date_created: date,
                    date_updated: date,
                });
                res.status(200).send({ review });
            } catch (err) {
                next(err);
            }
        }
    },
};
