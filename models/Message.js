const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    sender: String,
    content: String,
    time_sent: String,
});

module.exports = mongoose.model('Message', Message);