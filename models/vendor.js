const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const vendorSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firms: [{
    type: Schema.Types.ObjectId,
    ref: 'Firm'
  }]
});

module.exports = model('Vendor', vendorSchema);
