const mongoCollections = require("./../config/mongoCollections");

const lostpets = mongoCollections.lostpets;
const foundpets = mongoCollections.foundpets;

const getLostpets = async () => {
  try {
    const lostPetsCollection = await lostpets();

    const lostpetData = await lostPetsCollection.find({}).toArray();

    return lostpetData;
  } catch (error) {}
};

const getFoundpets = async () => {
  try {
    const foundPetsCollection = await foundpets();

    const foundpetData = await foundPetsCollection.find({}).toArray();

    return foundpetData;
  } catch (error) {}
};

const createLostPet = async (data) => {
  const lostPetsCollection = await lostpets();

  const newPet = { ...data };

  const insertInfo = await lostPetsCollection.insertOne(newPet);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: 400, msg: "Could not submit lost pet" };

  return { insertedPet: true };
};

const createFoundPet = async (data) => {
  const foundPetsCollection = await foundpets();

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
