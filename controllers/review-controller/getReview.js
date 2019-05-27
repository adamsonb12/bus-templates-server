const { checkSchema } = require('express-validator/check');

const { Review } = require('../../models');
const { checkValidations } = require('../../utils/customValidations');

module.exports = {
    validate: checkSchema({
        review_id: {
            in: ['params', 'query'],
            trim: true,
            isMongoId: true,
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { review_id } = req.query;
                const review = await Review.findById(review_id);
                if (review) {
                    res.status(200).send({ review });
                } else {
                    res.status(404).send('Not Found. Invalid review id');
                }
            } catch (err) {
                next(err);
            }
        }
    },
};
