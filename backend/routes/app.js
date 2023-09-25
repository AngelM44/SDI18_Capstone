const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);
app.use(express.json());
app.use(cors());

const usersRoutes = require("./users");
const interestRoutes = require("./interests.js");
const profileRoutes = require("./profile.js");
// const userInterestsRoutes = require("./user_interests");
const postsRoutes = require("./posts");

app.use("/", usersRoutes);
app.use("/interests", interestRoutes);
app.use("/profile", profileRoutes);
// app.use("/user-interests", userInterestsRoutes);
app.use("/posts", postsRoutes);

app.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json("Query parameter is required");
  }

  try {
    const users = await knex("users")
      .where("username", "ilike", `%${query}%`)
      .orWhere("first_name", "ilike", `%${query}%`)
      .orWhere("last_name", "ilike", `%${query}%`)
      .orWhere("location", "ilike", `%${query}%`)
      .select();

    const interests = await knex("interests")
      .where("name", "ilike", `%${query}%`)
      .select();

    const locations = await knex("users")
      .where("location", "ilike", `%${query}%`)
      .distinct("location")
      .select("location");

    res.json({ users, interests, locations });
  } catch (err) {
    console.error("Error performing search:", err.message);
    return res
      .status(500)
      .json("Error performing search. Please try again later.");
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
