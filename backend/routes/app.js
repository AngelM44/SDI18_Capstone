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
const postsRoutes = require("./posts");

app.use("/", usersRoutes);
app.use("/interests", interestRoutes);
app.use("/profile", profileRoutes);
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

    // Fetch users associated with the matching interests
    const interestIds = interests.map((interest) => interest.id);
    const profiles = await knex("profile")
      .modify((queryBuilder) => {
        interestIds.forEach((id) => {
          queryBuilder.orWhereRaw("?? = ANY(interests)", [id]);
        });
      })
      .select("user_id");
    const userIds = profiles.map((profile) => profile.user_id);
    const interestUsers = await knex("users")
      .whereIn("id", userIds)
      .select("*");

    res.json({ users, interests, locations, interestUsers });
  } catch (err) {
    console.error("Error performing search:", err.message);
    return res
      .status(500)
      .json("Error performing search. Please try again later.");
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
