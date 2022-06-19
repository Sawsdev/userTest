const { ObjectId } = require("mongodb");
const { Database } = require("../database/index");
const COLLECTION = "users";
const axios = require("axios");
const { Config } = require("../config");

const startDbConnection = async () => {
  return await Database(COLLECTION);
};

const getAllUsers = async () => {
  const collection = await startDbConnection();
  const users = collection.find({}).toArray();
  return users;
};

/**
 * Find one user using email
 * @param String email
 * @return {} User
 */
const getUserByEmail = async (email) => {
  const collection = await startDbConnection();
  const user = collection.findOne({ email });
  return user;
};

/**
 * Find one user using the _id
 * @param {ObjectId} id
 * @return {} User
 */
const getUserById = async (id) => {
  if (!id) return null;
  const collection = await startDbConnection();
  const user = collection.findOne({ _id: ObjectId(id) });
  return user;
};

/**
 *
 * @param {*} user
 * @returns ObjectId of new user
 */
const createUser = async (user) => {
  if (Object.keys(user).length == 0) return null;
  const prevUser = await getUserByEmail(user.email);
  if (prevUser) return prevUser;
  const collection = await startDbConnection();
  const result = await collection.insertOne(user);
  return result.insertedId;
};

const getUserPOI = async (query) => {
  if (!query) return null;
  const { data } = await axios.get(
    `https://api.tomtom.com/search/2/search/${query.text}.json&key=${Config.tomtomToken}`
  );
  return data;
};

module.exports.UsersService = {
  getAllUsers,
  createUser,
  getUserByEmail,
  getUserById,
  getUserPOI,
};
