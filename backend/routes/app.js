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

app.use("/users", usersRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
