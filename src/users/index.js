const express = require("express");
const { UsersController } = require("./controller");
const router = express.Router();
const auth = require("../middleware/auth");
module.exports.UsersAPI = (app) => {
  router
    .get("/users", UsersController.getUsers)
    .post("/users/register", UsersController.createUser)
    .post("/users/login", UsersController.loginUser)
    .post("/restaurants/nearby", auth, UsersController.getNearbyPOI);

  app.use("/api", router);
};
