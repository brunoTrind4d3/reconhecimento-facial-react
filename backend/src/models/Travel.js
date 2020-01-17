const mongoose = require("mongoose");
const Passanger = require("./utils/Passanger");

const TravelSchema = new mongoose.Schema({
  travel_number: String,
  date: String,
  passangers: {
    type: [Passanger],
  }
});

module.exports = mongoose.model("Travel", TravelSchema);