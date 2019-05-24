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
