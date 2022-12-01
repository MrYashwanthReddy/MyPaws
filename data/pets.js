const mongoCollections = require("./../config/mongoCollections");

const lostpets = mongoCollections.lostpets;
const foundpets = mongoCollections.foundpets;

const getLostpets = async () => {
  try {
    const lostPetsCollection = await lostpets();
  } catch (error) {}
};

const getFoundpets = async () => {
  try {
    const foundPetsCollection = await foundpets();
  } catch (error) {}
};
