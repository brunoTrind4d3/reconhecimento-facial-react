const mongoose = require("mongoose");

const Passanger = new mongoose.Schema({
    name: String,
    passportCard: String,
    photoUrl: String,
    checked: Boolean
});

module.exports = Passanger;