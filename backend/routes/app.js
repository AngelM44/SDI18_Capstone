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
const userInterestsRoutes = require("./user_interests");
const postsRoutes = require("./posts"); 

app.use("/", usersRoutes);
app.use("/interests", interestRoutes);
app.use("/profile", profileRoutes);
app.use("/user-interests", userInterestsRoutes);
app.use("/posts", postsRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
