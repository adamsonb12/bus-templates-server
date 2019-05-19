const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const addressSchema = new Schema({
    street_address_line_1: { type: String, default: '' },
    street_address_line_2: { type: String, default: '' },
    post_office_box_number: { type: String, default: '' },
    locality: { type: String, default: '' },
    region: { type: String, default: '' },
    postal_code: { type: String, default: '' },
    user_id: { type: ObjectId, ref: 'User' },
});

model('PostalAddress', addressSchema);


