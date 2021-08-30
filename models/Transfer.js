const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transfer = new Schema({
    sender: String,
    receiver: String,
    amount: Number,
    reason: String,
    comment: String
});

module.exports = mongoose.model('Transfer', Transfer);