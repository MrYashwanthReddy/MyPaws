const {
  dbConnection,
  closeConnection,
} = require("./../config/mongoConnection");

const data = require("./../data");

const users = data.users;
const pets = data.pets;
const posts = data.posts;

const fs = require("fs");

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  async function bindata() {
    await fs.readFile("assets/img.jpeg", "base64", async (e, data) => {
      const buffer = new Buffer(data, "base64");
      call(buffer);
    });
  }

  bindata();

  async function call(binImg) {
    const user1 = await users.createUser(
      "Yashwanth",
      "Reddy",
      "yash@gmail.com",
      "jack",
      "lab",
      "$2b$10$dg9Yk46F6V7hMrXv8bboG.jSo7cB6L4RlkovGr77Esj.3wdaSasD.",
      binImg
    );

    const user2 = await users.createUser(
      "Yash",
      "Reddy",
      "yashwanth@gmail.com",
      "jack",
      "lab",
      "$2b$10$dg9Yk46F6V7hMrXv8bboG.jSo7cB6L4RlkovGr77Esj.3wdaSasD.",
      binImg
    );

    const uid1 = await user1.data._id.toString();
    const uid2 = await user2.data._id.toString();

    const post1 = await posts.createPost({
      title: "POST 1",
      content: "This is the description for post 1",
      userId: uid1,
      postDate: "12/05/2022",
      likes: 0,
      image: binImg,
    });

    const post2 = await posts.createPost({
      title: "POST 2",
      content: "This is the description for post 2",
      userId: uid2,
      postDate: "12/05/2022",
      likes: 0,
      image: binImg,
    });

    console.log("Done seeding database");

    await closeConnection();
  }
};

main().catch(console.log);
