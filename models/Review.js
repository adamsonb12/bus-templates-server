const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    score: Number,
    description: { type: String, default: '' },
    date_reviewed: Date,
    file_id: { type: ObjectId, ref: 'File' },
    user_id: { type: ObjectId, ref: 'User' },
});

model('Review', reviewSchema);
