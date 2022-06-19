require("dotenv").config();

module.exports.Config = {
  port: process.env.PORT,
  dbUri: process.env.MONGO_URI,
  dbName: process.env.MONGO_DBNAME,
  tokenSecret: process.env.TOKEN_SECRET,
  tomtomToken: process.env.TOMTOM_TOKEN,
};
