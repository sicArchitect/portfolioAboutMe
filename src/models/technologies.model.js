const mongoose = require('mongoose');

const technologiesSchema = new mongoose.Schema({
  name: { type: String, require: true, minlength: 3, maxlength: 10 },
  level: { type: Number, require: true },
});

technologiesSchema.index({ name: 'text' });
module.exports = mongoose.model('Technology', technologiesSchema);
