const express = require("express");
const app = express();
const PORT = 8080;
const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);
app.use(express.json());

app.use(cors);

app.use("/users", usersRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
