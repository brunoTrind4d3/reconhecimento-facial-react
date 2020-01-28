const axios = require("axios");
const Travel = require("../models/Travel");
const Passanger = require("../models/utils/Passanger");

module.exports = {
  async index(request, response) {
    const { travel_number, date } = request.query;

    const travel = await Travel.find({
      travel_number,
      date
    });
    return response.json({ travel });
  },

  async store(request, response) {
    const { travel_number, date, passangers } = request.body;

    let travel = await Travel.findOne({ travel_number, date });

    travel = await Travel.create({
      travel_number,
      date,
      passangers
    });
    return response.json(travel);
  },

  async recognize(request, response) {
    const { travel_number, date, dataUri } = request.body;

    let travel = await Travel.findOne({ travel_number, date });
    // const imageReceived = new Image(dataUri);
    // const imagePng = new Parse.file("photoPng.png",imageReceived);
    // const {passangers} = travel;

    // passangers.map(pass => {
    //    const findPerson = await FaceApi.verificar( imagePng, pass.photoUrl);
    //    if(findPerson.similarity > 0.85){
    //     pass = await Passanger.update({
    //       checked: true
    //     });
    //     return response.json(pass);
    //    }
    // });
    return response.json(travel);
  }
};
