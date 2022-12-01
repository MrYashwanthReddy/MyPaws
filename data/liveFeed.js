const mongoCollections = require("../config/mongoCollections");
const liveFeed = mongoCollections.liveFeed;


const getAllFeed = async () => {
    try {
        const liveFeedCollection = await liveFeed();
        const data = await liveFeedCollection.find({}).toArray();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const createFeed = async (
    userId,
    data,
) => {
    const liveFeedCollection = await liveFeed();

    const feedData = {
        userId,
        data,
        images: '[]',
        date: new Date().toJSON(),
        isActive: true,
        reports: '[]',
        noOfReport: 0
    };

    const insertInfo = await liveFeedCollection.insertOne(feedData);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw { status: 400, msg: "Could not add feed" };

    const newId = insertInfo.insertedId.toString();
    //const newUser = await getUserById(newId);

    return { status: 200, insertedUser: true };
};


module.exports = {
    getAllFeed,
    createFeed,
};
