const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const fileSchema = new Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    source_url: { type: String, default: '' },
    user_id: { type: ObjectId, ref: 'User' },
    category_name: { type: String, ref: 'FileCategory' },
    date_created: Date,
    date_updated: Date,
});

module.exports = model('File', fileSchema, 'files');
