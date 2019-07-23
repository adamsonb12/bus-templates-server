const { checkSchema } = require('express-validator/check');

const { File } = require('../../models');
const { checkValidations, validUser, validFileCategory } = require('../../utils/customValidations');

// TODO => Make this work with an s3 bucket of some type.
// Most likely, this won't expect a source url, instead this would post the resource
// to the bucket, get the url from that and save it to our db as the
// source_url and then return the source_url to the front end

module.exports = {
    validate: checkSchema({
        title: {
            in: ['params', 'body'],
            errorMessage: 'invalid title',
            trim: true,
            escape: true,
            isString: true,
            isLength: {
                errorMessage: 'title must be at least 2 characters long',
                options: { min: 2 },
            },
        },
        description: {
            in: ['params', 'body'],
            errorMessage: 'invalid description',
            trim: true,
            escape: true,
            isString: true,
        },
        source_url: {
            in: ['params', 'body'],
            errorMessage: 'invalid source_url',
            trim: true,
            isURL: true,
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
        category_name: {
            in: ['params', 'body'],
            errorMessage: 'category_name is required and must be a valid category_name',
            escape: true,
            trim: true,
            custom: {
                options: validFileCategory,
            },
        },
    }),

    action: async (req, res, next) => {
        checkValidations(req, res);
        if (!res.headersSent) {
            try {
                const { title, description, source_url, user_id, category_name } = req.body;
                const date = new Date();
                const file = await File.create({
                    title,
                    description,
                    source_url,
                    user_id,
                    category_name,
                    date_created: date,
                    date_updated: date,
                });
                res.status(200).send({ file });
            } catch (err) {
                next(err);
            }
        }
    },
};
