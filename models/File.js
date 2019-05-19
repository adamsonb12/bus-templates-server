const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const fileSchema = new Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    date_uploaded: Date,
    date_deleted: Date,
    source_url: { type: String, default: '' },
    user_id: { type: ObjectId, ref: 'User' },
});

model('File', fileSchema);
