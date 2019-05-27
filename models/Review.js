const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const reviewSchema = new Schema({
    score: Number,
    description: { type: String, default: '' },
    file_id: { type: ObjectId, ref: 'File' },
    user_id: { type: ObjectId, ref: 'User' },
    date_created: Date,
    date_updated: Date,
});

module.exports = model('Review', reviewSchema, 'reviews');
