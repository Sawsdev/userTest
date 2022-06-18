/**Main dependencies */
const express = require("express");
const debug = require("debug")("app:main");

/** Api parts */

const app = express();
app.use(express.json());

/**Modules */
const { Config } = require("./src/config");

/**Server start */
app.listen(Config.port, () => {
  debug(`Server listening on port ${Config.port}`);
});
