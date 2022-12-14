const mongoCollections = require("../config/mongoCollections");
const {validValue, checkString, checkId} = require("../validation");

const users = mongoCollections.users;

const bcrypt = require("bcrypt");
const {ObjectId} = require("mongodb");

const getAllUsers = async () => {
  let usersCollection;
  try {
    usersCollection = await users();
  } catch (error) {
    throw {status: 500, msg: "Error: Server error"};
  }

  const data = await usersCollection.find({}).toArray();

  return data;
};

const createUser = async ({
  firstName,
  lastName,
  age,
  email,
  petName,
  petBreed,
  password,
  profileImage,
}) => {
  try {
    const usersCollection = await users();

    const user = await usersCollection.findOne({email: email});

    if (user) {
      throw {status: 403, msg: "User already exists"};
    }

    const userData = {
      firstName,
      lastName,
      age,
      email,
      petName,
      petBreed,
      password,
      profileImage,
    };

    const insertInfo = await usersCollection.insertOne(userData);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw {status: 400, msg: "Could not add user"};

    const newId = insertInfo.insertedId.toString();
    const newUser = await getUserById(newId);

    return {status: 200, insertedUser: true, data: newUser};
  } catch (error) {
    throw {status: 500, msg: "Error: Server error"};
  }
};

const getUserById = async (id) => {
  id = validValue(id);
  id = checkString(id, "id");
  id = checkId(id);
  let usersCollection;
  try {
    usersCollection = await users();
  } catch (error) {
    throw {status: 500, msg: "Error: Server error"};
  }

  const user = await usersCollection.findOne({_id: ObjectId(id)});

  if (user === null) throw {status: 404, msg: "Error: No User with that id"};

  return user;
};

const userLogin = async (email, pass) => {
  let usersCollection;
  try {
    usersCollection = await users();
  } catch (error) {
    throw {status: 500, msg: "Error: Server error"};
  }

  const user = await usersCollection.findOne({email: email});
  if (user == null) {
    throw {status: 401, msg: "Invalid Username or Password"};
  }
  let dbPass = validValue(user.password);

  const validPassword = await bcrypt.compare(pass, dbPass);

  if (validPassword) return {status: 200, ...user};
  else throw {status: 401, msg: "Invalid Username or Password"};
};

module.exports = {
  getAllUsers,
  userLogin,
  createUser,
  getUserById,
};
