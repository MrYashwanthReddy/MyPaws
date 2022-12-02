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

module.exports = {
  getLostpets,
  getFoundpets,
};
