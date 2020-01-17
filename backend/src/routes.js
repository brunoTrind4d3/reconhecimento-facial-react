const { Router } = require("express");
const TravelControlle = require("./controller/TravelController");
const routes = Router();

routes.post("/travel", TravelControlle.store);
routes.get("/travel", TravelControlle.index);

module.exports = routes;