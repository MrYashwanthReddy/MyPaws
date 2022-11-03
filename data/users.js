const mongoCollections = require("../config/mongoCollections");
const { validValue, checkString, checkId } = require("../validation");

const users = mongoCollections.users;

const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const getAllUsers = async () => {
  try {
    const usersCollection = await users();
    const data = await usersCollection.find({}).toArray();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (
  firstName,
  lastName,
  email,
  petName,
  petBreed,
  password
) => {
  const usersCollection = await users();

  const newUser = {
    firstName,
    lastName,
    email,
    petName,
    petBreed,
    password,
  };

  const insertInfo = await usersCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: 400, msg: "Could not add user" };

  const newId = insertInfo.insertedId.toString();
  const user = await getUserById(newId);

  return user;
};

const getUserById = async (id) => {
  id = validValue(id);
  id = checkString(id, "id");
  id = checkId(id);

  const usersCollection = await users();
  const user = await usersCollection.findOne({ _id: ObjectId(id) });

  if (user === null) throw { status: 404, msg: "Error: No User with that id" };

  return user;
};

const userLogin = async (email, pass) => {
  const usersCollection = await users();
  const user = await usersCollection.findOne({ email: email });
  let dbPass = validValue(user.password);

  const validPassword = await bcrypt.compare(pass, dbPass);

  if (validPassword) return true;
  else return false;
};

module.exports = {
  getAllUsers,
  userLogin,
  createUser,
};
