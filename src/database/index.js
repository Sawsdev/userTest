const { MongoClient } = require("mongodb");
const debug = require("debug")("app:db_module");
const { Config } = require("../config");
let conn = null;
module.exports.Database = (collection) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!conn) {
        const client = new MongoClient(Config.dbUri);
        conn = await client.connect();
        debug("Connected to MongoDB Atlas");
      }
      debug("Re-using conection");
      const db = conn.db(Config.dbName);
      resolve(db.collection(collection));
    } catch (error) {
      reject(error);
    }
  });
