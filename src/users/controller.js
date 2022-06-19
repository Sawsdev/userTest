debug = require("debug")("app:mod_user_controller");
const createError = require("http-errors");
const { UsersService } = require("./service");
const { Response } = require("../common/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Config } = require("../config");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAllUsers();
      if (users) {
        users = users.map((user) => {
          return {
            id: user._id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          };
        });
      }
      Response.success(res, 200, `All users`, users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const {
        body: { username, first_name, last_name, password, email },
      } = req;

      if (!username || !first_name || !last_name || !password || !email) {
        Response.error(res, new createError.BadRequest());
      }
      encryptedPass = await bcrypt.hash(password, 10);
      const newUser = {
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: encryptedPass,
        email: email.toLowerCase(),
      };

      const insertedId = await UsersService.createUser(newUser);
      if (!insertedId) {
        Response.error(res, createError.BadRequest());
      }
      if (Object.keys(insertedId).length > 0) {
        res.status(409).send("User already exist. Please Login");
      }
      const user = await UsersService.getUserById(insertedId);
      const token = jwt.sign({ user_id: user._id, email }, Config.tokenSecret, {
        expiresIn: "2h",
      });
      user.token = token;
      Response.success(res, 200, `Usuario Registrado`, user);
    } catch (error) {
      Response.error(res);
      debug(error);
    }
  },

  loginUser: async (req, res) => {
    try {
      const {
        body: { email, password },
      } = req;
      if (!email || !password) {
        Response.error(res, createError.BadRequest());
      }
      const user = await UsersService.getUserByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          Config.tokenSecret,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;

        Response.success(res, 200, `Login succesfull!`, user);
      }
    } catch (error) {
      Response.error(res);
      debug(error);
    }
  },

  getNearbyPOI: async (req, res) => {
    try {
      const {
        body: { query },
      } = req;
      const data = await UsersService.getUserPOI(query);
      if (!data) {
        Response.error(res, createError.BadRequest());
      }
      return data;
    } catch (error) {
      Response.error(res);
    }
  },
};
