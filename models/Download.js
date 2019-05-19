const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const downloadSchema = new Schema({
    file_id: { type: ObjectId, ref: 'File' },
    user_id: { type: ObjectId, ref: 'User' },
    date_downloaded: Date,
});

model('Download', downloadSchema);
