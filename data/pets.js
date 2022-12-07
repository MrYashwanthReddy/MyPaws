const mongoCollections = require("./../config/mongoCollections");

const lostpets = mongoCollections.lostpets;
const foundpets = mongoCollections.foundpets;

const getLostpets = async () => {
  let lostPetsCollection;

  try {
    lostPetsCollection = await lostpets();
  } catch (error) {
    throw { status: 500, status: "Error: Server Error" };
  }

  const lostpetData = await lostPetsCollection.find({}).toArray();

  return lostpetData;
};

const getFoundpets = async () => {
  let foundPetsCollection;

  try {
    foundPetsCollection = await foundpets();
  } catch (error) {
    throw { status: 500, status: "Error: Server Error" };
  }

  const foundpetData = await foundPetsCollection.find({}).toArray();

  return foundpetData;
};

const createLostPet = async (data) => {
  let lostPetsCollection;

  try {
    lostPetsCollection = await lostpets();
  } catch (error) {
    throw { status: 500, status: "Error: Server Error" };
  }
  const newPet = { ...data };

  const insertInfo = await lostPetsCollection.insertOne(newPet);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: 400, msg: "Could not submit lost pet" };

  return { insertedPet: true };
};

const createFoundPet = async (data) => {
  try {
    foundPetsCollection = await foundpets();
  } catch (error) {
    throw { status: 500, status: "Error: Server Error" };
  }
  const newPet = { ...data };

  const insertInfo = await foundPetsCollection.insertOne(newPet);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: 400, msg: "Could not submit lost pet" };

  return { insertedPet: true };
};

module.exports = {
  getLostpets,
  getFoundpets,
  createLostPet,
  createFoundPet,
};
