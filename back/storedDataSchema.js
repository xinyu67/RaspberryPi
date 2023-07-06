const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const storedDataSchema = new Schema({
  date: { type: String, required: true },
  HTValue: { type: Array, required: true },
});

module.exports = mongoose.model('StoredData', storedDataSchema);