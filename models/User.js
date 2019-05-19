const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    date_birth: Date,
    email: { type: String, default: '' },
    gender: { type: String, default: 'male' },
    name_first: { type: String, default: '' },
    name_last: { type: String, default: '' },
    name_middle: { type: String, default: '' },
    password: String, // find a way to hash these obviously
    phone_number: { type: String, default: '' },
});

model('User', userSchema);
