/**Main dependencies */
const express = require("express");
const debug = require("debug")("app:main");
const { Config } = require("./src/config");

/** Api parts */
const { UsersAPI } = require("./src/users");
const { IndexAPI } = require("./src/index");
const app = express();
app.use(express.json());

/**Modules */
UsersAPI(app);
IndexAPI(app);
/**Server start */
app.listen(Config.port, () => {
  debug(`Server listening on port ${Config.port}`);
});
