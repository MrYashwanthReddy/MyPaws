const mongoCollections = require("../config/mongoCollections");
const {
  validValue,
  checkString,
  checkId,
  checkPasswordString,
  checkEmail,
  checkPassword,
} = require("../validation");

const users = mongoCollections.users;

const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const getAllUsers = async () => {
  let usersCollection;
  try {
    usersCollection = await users();
  } catch (error) {
    throw { status: 500, msg: "Error: Server error" };
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

    const user = await usersCollection.findOne({ email: email });

    if (user) {
      throw { status: 403, msg: "Error: User already exists" };
    }

    firstName = validValue(firstName, "FIRST NAME");
    lastName = validValue(lastName, "LAST NAME");
    age = validValue(age, "AGE");
    email = validValue(email, "EMAIL");
    petName = validValue(petName, "PET NAME");
    petBreed = validValue(petBreed, "PET BREED");
    password = validValue(password, "PET BREED");

    firstName = checkString(firstName, "FIRST NAME");
    lastName = checkString(lastName, "LAST NAME");
    age = checkString(age, "AGE");
    email = checkString(email, "EMAIL");
    petName = checkString(petName, "PET NAME");
    petBreed = checkString(petBreed, "PET BREED");
    password = checkPasswordString(password, "PET BREED");

    email = checkEmail(email);

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
      throw { status: 400, msg: "Error: Could not add user" };

    const newId = insertInfo.insertedId.toString();
    const newUser = await getUserById(newId);

    return { status: 200, insertedUser: true, data: newUser };
  } catch (error) {
    throw {
      status: error.status || 500,
      msg: error.msg || "Error: Server error",
    };
  }
};

const getUserById = async (id) => {
  id = validValue(id);
  id = checkString(id, "ID");

  id = checkId(id);

  let usersCollection;
  try {
    usersCollection = await users();
  } catch (error) {
    throw { status: 500, msg: "Error: Server error" };
  }

  const user = await usersCollection.findOne({ _id: ObjectId(id) });

  if (user === null) throw { status: 404, msg: "Error: No User with that id" };

  return user;
};

const userLogin = async ({ email, password }) => {
  email = validValue(email, "EMAIL");
  password = validValue(password, "PASSWORD");

  email = checkString(email, "EMAIL");
  password = checkPasswordString(password, "PASSWORD");

  email = checkEmail(email);
  password = checkPassword(password);

  let usersCollection;
  try {
    usersCollection = await users();
  } catch (error) {
    throw { status: 500, msg: "Error: Server error" };
  }

  const user = await usersCollection.findOne({ email: email });
  if (user == null) {
    throw { status: 401, msg: "Error: Invalid Username or Password" };
  }
  let dbPass = validValue(user.password);

  const validPassword = await bcrypt.compare(password, dbPass);

  if (validPassword) return { status: 200, ...user };
  else throw { status: 401, msg: "Error: Invalid Username or Password" };
};

module.exports = {
  getAllUsers,
  userLogin,
  createUser,
  getUserById,
};
