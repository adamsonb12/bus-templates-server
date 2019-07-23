const { validationResult } = require('express-validator/check');

const { Address, Download, File, FileCategory, Review, User } = require('../models');
const { GENDERS } = require('./constants');

module.exports = {
    checkValidations: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    },

    // Address Validations
    validAddress: async address_id => {
        const address = await Address.findById(address_id);
        if (!address) {
            throw new Error('Invalid Address Id. Address doesn\'t Exist');
        }
    },

    // File Category Validations
    validFileCategory: async cat_name => {
        const file_category = await FileCategory.findOne({ category_name: cat_name });
        if (!file_category) {
            throw new Error('Invalid File Category Name. Category doesn\'t exist');
        }
    },

    // Download Validations
    validDownload: async download_id => {
        const download = await Download.findById(download_id);
        if (!download) {
            throw new Error('Invalid Download Id. Download doesn\'t exist');
        }
    },

    // File Validations
    validFile: async file_id => {
        const file = await File.findById(file_id);
        if (!file) {
            throw new Error('Invalid File Id. File doesn\'t exist');
        }
    },

    // Review Validations
    validReview: async review_id => {
        const review = await Review.findById(review_id);
        if (!review) {
            throw new Error('Invalid Review Id. Review doesn\'t exist');
        }
    },

    // User Validations
    validNewEmail: async email => {
        const user_id = await User.findOne({ email: email }, '_id');
        if (user_id && user_id._id) {
            throw new Error('Email already in use');
        }
    },

    validGender: gender => {
        return GENDERS.includes(gender);
    },

    validUser: async user_id => {
        const user = await User.findById(user_id);
        if (!user) {
            throw new Error('Invalid User Id. User doesn\'t exist');
        }
    },
};
