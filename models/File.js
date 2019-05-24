const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const fileSchema = new Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    source_url: { type: String, default: '' },
    user_id: { type: ObjectId, ref: 'User' },
    date_created: Date,
    date_updated: Date,
    category_id: { type: ObjectId, ref: 'FileCategory' },
});

module.exports = model('File', fileSchema, 'files');
