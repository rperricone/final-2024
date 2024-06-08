const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: { type: String, required: true , unique: false}, //person who posted status
    ticketId: { type: String, required: true , unique: false},
    dateCreated: {type: Date, required: true},
    description: { type: String, required: false},
    status: { type: String, required: true},
});


module.exports = mongoose.model("activity", activitySchema);