const mongoCollections = require("../config/mongoCollections");

const users = mongoCollections.users;

const getAllUsers = async () => {
  const usersCollection = await users();
  const data = await usersCollection.find({}).toArray();
  return data;
};

const createUser = async () => {
  
}

module.exports = {
  getAllUsers,
};
