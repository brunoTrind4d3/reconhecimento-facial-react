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
      const {passangers} = travel;
      const labeledFaceDescriptors = await Promise.all(
      passangers.map(async label => {
        const imageReceived = new Image(dataUri);
        const passPhoto = new Image(label.photoUrl);
        const img = await faceapi.fetchImage(imageReceived)
        
        const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        
        if (!fullFaceDescription) {
          throw new Error(`no faces detected for ${label}`)
        }
        
        const faceDescriptors = [fullFaceDescription.descriptor]
        return new faceapi.LabeledFaceDescriptors(passPhoto, faceDescriptors)
      })
    )

    const maxDescriptorDistance = 0.6
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)

    const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))
    
      if(results >= 0.6){
            label = await Passanger.update({
              checked: true
            });
        return response.json(label);
      }
  
      return response.json(passangers);
  }
};
