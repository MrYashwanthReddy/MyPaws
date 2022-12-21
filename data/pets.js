const {
  validValue,
  checkString,
  checkPasswordString,
  checkAnimal,
  checkAlphabets,
  checkAlphabetsWithSpaces,
  checkBoolean,
  checkGender,
  checkNumbers,
  checkId,
  checkEmail,
} = require("../validation");
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

const createLostPet = async ({
  animal,
  gender,
  color,
  collar,
  height,
  bodyType,
  breedType,
  hairType,
  earType,
  userId,
}) => {
  let lostPetsCollection;

  try {
    lostPetsCollection = await lostpets();
  } catch (error) {
    throw { status: 500, sttus: "Error: Server Error" };
  }

  animal = validValue(animal, "animal");
  bodyType = validValue(bodyType, "body type");
  breedType = validValue(breedType, "breed type");
  color = validValue(color, "color");
  collar = validValue(collar, "collar");
  earType = validValue(earType, "ear type");
  gender = validValue(gender, "gender");
  hairType = validValue(hairType, "hair type");
  height = validValue(height, "height");

  animal = checkString(animal, "animal");
  bodyType = checkString(bodyType, "body type");
  breedType = checkString(breedType, "breed type");
  color = checkString(color, "color");
  collar = checkString(collar, "collar");
  earType = checkString(earType, "ear type");
  gender = checkPasswordString(gender, "gender");
  hairType = checkString(hairType, "hair type");
  height = checkString(height, "height");

  animal = checkAnimal(animal);
  bodyType = checkAlphabets(bodyType, "body type");
  breedType = checkAlphabetsWithSpaces(breedType, "breed type");
  color = checkAlphabets(color, "color");
  collar = checkBoolean(collar, "collar");
  earType = checkAlphabets(earType, "ear type");
  gender = checkGender(gender);
  hairType = checkAlphabets(hairType, "hair type");
  height = checkNumbers(height, "height");

  userId = checkId(userId);

  const newPet = {
    animal,
    color,
    collar,
    height,
    gender,
    hairType,
    earType,
    bodyType,
    userId,
    breedType,
  };

  const insertInfo = await lostPetsCollection.insertOne(newPet);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw { status: 400, msg: "Could not submit lost pet" };

  return { insertedPet: true };
};

const createFoundPet = async ({
  firstName,
  lastName,
  email,
  animal,
  gender,
  color,
  collar,
  height,
  bodyType,
  breedType,
  hairType,
  earType,
}) => {
  let foundPetsCollection;
  try {
    foundPetsCollection = await foundpets();
  } catch (error) {
    throw { status: 500, status: "Error: Server Error" };
  }
  firstName = validValue(firstName, "first name");
  lastName = validValue(lastName, "last name");
  email = validValue(email, "email");
  animal = validValue(animal, "animal");
  bodyType = validValue(bodyType, "body type");
  breedType = validValue(breedType, "breed type");
  color = validValue(color, "color");
  collar = validValue(collar, "collar");
  earType = validValue(earType, "ear type");
  gender = validValue(gender, "gender");
  hairType = validValue(hairType, "hair type");
  height = validValue(height, "height");

  firstName = checkString(firstName, "first name");
  lastName = checkString(lastName, "last name");
  email = checkString(email, "email");
  animal = checkString(animal, "animal");
  bodyType = checkString(bodyType, "body type");
  breedType = checkString(breedType, "breed type");
  color = checkString(color, "color");
  collar = checkString(collar, "collar");
  earType = checkString(earType, "ear type");
  gender = checkPasswordString(gender, "gender");
  hairType = checkString(hairType, "hair type");
  height = checkString(height, "height");

  firstName = checkAlphabets(firstName, "first name");
  lastName = checkAlphabets(lastName, "last name");
  email = checkEmail(email);
  animal = checkAnimal(animal);
  bodyType = checkAlphabets(bodyType, "body type");
  breedType = checkAlphabetsWithSpaces(breedType, "breed type");
  color = checkAlphabets(color, "color");
  collar = checkBoolean(collar, "collar");
  earType = checkAlphabets(earType, "ear type");
  gender = checkGender(gender);
  hairType = checkAlphabets(hairType, "hair type");
  height = checkNumbers(height, "height");

  const newPet = {
    firstName,
    lastName,
    email,
    animal,
    color,
    collar,
    height,
    gender,
    hairType,
    earType,
    bodyType,
    breedType,
  };

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

  const weightage = 100 / 9;

  for (let i = 0; i < lostData.length; i++) {
    const lostElement = lostData[i];
    let lostAnimal = lostElement.animal;
    let lostColor = lostElement.color;
    let lostCollar = lostElement.collar;
    let lostHeight = lostElement.height;
    let lostGender = lostElement.gender;
    let lostHairType = lostElement.hairType;
    let lostEarType = lostElement.earType;
    let lostBodyType = lostElement.bodyType;
    let lostBreedType = lostElement.breedType;

    for (let j = 0; j < foundData.length; j++) {
      const element = foundData[j];

      let foundAnimal = element.animal;
      let foundColor = element.color;
      let foundCollar = element.collar;
      let foundHeight = element.height;
      let foundGender = element.gender;
      let foundHairType = element.hairType;
      let foundEarType = element.earType;
      let foundBodyType = element.bodyType;
      let foundBreedType = element.breedType;

      if (lostAnimal == foundAnimal) {
        percentage = percentage + weightage;
      } else break;
      if (lostColor == foundColor) {
        percentage = percentage + weightage;
      }
      if (lostCollar == foundCollar) {
        percentage = percentage + weightage;
      }
      if (lostHeight == foundHeight) {
        percentage = percentage + weightage;
      }
      if (lostGender == foundGender) {
        percentage = percentage + weightage;
      }
      if (lostHairType == foundHairType) {
        percentage = percentage + weightage;
      }
      if (lostEarType == foundEarType) {
        percentage = percentage + weightage;
      }
      if (lostBodyType == foundBodyType) {
        percentage = percentage + weightage;
      }
      if (lostBreedType == foundBreedType) {
        percentage = percentage + weightage;
      }

      if (percentage > 60) {
        return { match: true, lost: lostElement, found: element };
      }
    }
  }

  return { match: false };
};

module.exports = {
  getLostpets,
  getFoundpets,
  createLostPet,
  createFoundPet,
  makeMatch,
};
