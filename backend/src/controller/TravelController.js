const axios = require("axios");
const Travel = require("../models/Travel");

module.exports = {
    async index(request, response) {

    const { travel_number, date } = request.query;
    
      const travel = await Travel.find({
          travel_number,
          date
      });

      console.log({travel});      
      return response.json({ travel });
    },

    async store(request, response){
        const { travel_number, date, passangers} = request.body;

        let travel = await Travel.findOne({ travel_number, date });

        travel = await Travel.create({
            travel_number,
            date,
            passangers
        });
        return response.json(travel);
    }
}