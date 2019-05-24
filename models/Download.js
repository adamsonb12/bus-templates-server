const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const downloadSchema = new Schema({
    file_id: { type: ObjectId, ref: 'File' },
    user_id: { type: ObjectId, ref: 'User' },
    date_downloaded: Date,
    date_created: Date,
    date_updated: Date,
});

module.exports = model('Download', downloadSchema, 'downloads');
