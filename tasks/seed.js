const { isAxiosError } = require("axios");
const { Binary } = require("mongodb");
const {
  dbConnection,
  closeConnection,
} = require("./../config/mongoConnection");

const data = require("./../data");

const users = data.users;
const pets = data.pets;
const posts = data.posts;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  const user = await users.createUser(
    "Yashwanth",
    "Reddy",
    "yash@gmail.com",
    "jack",
    "lab",
    "$2b$10$dg9Yk46F6V7hMrXv8bboG.jSo7cB6L4RlkovGr77Esj.3wdaSasD."
  );
  const uid = user.data._id.toString();

  const post1 = await posts.createPost({
    title: "title",
    content: "description",
    userId: uid,
    postDate: "12/05/2022",
    likes: 0,
  });

  const post2 = await posts.createPost({
    title: "title",
    content: "description",
    userId: uid,
    postDate: "12/05/2022",
    likes: 0,
  });

  console.log("Done seeding database");

  await closeConnection();
};

main().catch(console.log);
