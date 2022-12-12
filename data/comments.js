const { posts } = require("../config/mongoCollections");

const getAllComments = async (id) => {
  let postsCollection;
  try {
    postsCollection = await posts();
  } catch (error) {
    throw { status: 500, msg: "Error: Server Error" };
  }
};

const createComment = async() => {
    
}
