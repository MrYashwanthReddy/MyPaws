const { ObjectId } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const liveFeed = mongoCollections.liveFeed;


const getAllFeed = async () => {
    try {
        const liveFeedCollection = await liveFeed();
        //const data = await liveFeedCollection.find({}).toArray();
        const data = await liveFeedCollection.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'users'
                }
            }, {
                $project: {
                    _id: 1,
                    data: 1,
                    images: 1,
                    date: 1,
                    isActive: 1,
                    users: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        petName: 1,
                        petBreed: 1
                    }



                }
            }
        ]).toArray();

        return data;
    } catch (error) {
        console.log(error);
    }
};

const createFeed = async (
    userId,
    data,
    files
) => {
    const liveFeedCollection = await liveFeed();

    let imgs = [];
    try {
        files.forEach(i => {
            imgs.push(i.path);
        });
    } catch (c) { }

    const feedData = {
        userId: ObjectId(userId),
        data,
        images: JSON.stringify(imgs),
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
