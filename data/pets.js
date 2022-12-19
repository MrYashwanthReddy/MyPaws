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
  let foundPetsCollection;
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

const makeMatch = async () => {
  const lostData = await getLostpets();
  const foundData = await getFoundpets();

  //DATA

  //CAT
  //HAIRTYPES
  // 1. hairless
  // 2. long
  // 3. short
  // 4. sparse
  // 5. medium
  // 6 .curledhair

  //EARTYPES
  // 1. staight
  // 2. curledear
  // 3. folded
  // 4. loosely
  // 5. floppy

  //DOG
  //HAIRTYPES
  // 1. curly
  // 2. double
  // 3. hairless
  // 4. long
  // 5. medium
  // 6. short
  // 7. silky
  // 8. wire

  //EARTYPES
  // 1. batt
  // 2. blunt
  // 3. button
  // 4. flame
  // 5. cocked
  // 6. drop
  // 7. filbert
  // 8. folded
  // 9. hoodded
  // 10.prick
  // 11.rose
  // 12.v

  //Weight
  // 1. serverelyUnderWeight
  // 2. underWeight
  // 3. idealWeight
  // 4. overWeight

  return { ...lostData, ...foundData };
};

module.exports = {
  getLostpets,
  getFoundpets,
  createLostPet,
  createFoundPet,
  makeMatch,
};
