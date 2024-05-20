const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    userId: { type: String, required: true , unique: false},
    description: { type: String, required: false , unique: false},
    location: {
        lat: { type: String, required: true , unique: false},
        lon: { type: String, required: true , unique: false}
    },
    dateCreated: { type: Date, required: true , unique: false},



});

ticketSchema.index({'$**': 'text'});
module.exports = mongoose.model("ticket", ticketSchema);