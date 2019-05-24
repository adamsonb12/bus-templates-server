const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    date_birth: Date,
    email: { type: String, default: '' },
    gender: { type: String, default: 'male' },
    name_first: { type: String, default: '' },
    name_last: { type: String, default: '' },
    name_middle: { type: String, default: '' },
    password: String,
    phone_number: { type: String, default: '' },
    date_created: Date,
    date_updated: Date,
});

module.exports = model('User', userSchema, 'users');
