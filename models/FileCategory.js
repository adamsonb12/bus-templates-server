const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const fileCategorySchema = new Schema({
    category_name: { type: String, default: '' },
});

module.exports = model('FileCategory', fileCategorySchema, 'fileCategories');
