const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

router.post("/register", async (req, res) => {
  const { first_name, last_name, dod_id, username, password, email, location } =
    req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await knex("users")
      .insert({
        first_name,
        last_name,
        dod_id,
        username,
        password: hashedPassword,
        email,
        location,
      })
      .returning("*");

    const user_id = newUser[0].id; 
    const defaultProfile = {
      user_id,
      availability: "Edit Availability", 
      info: "Edit Info",
      goals: "Edit Goals",
    };
    await knex("profile").insert(defaultProfile).returning("*");

    res.status(201).json(newUser[0]);
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(400).json("Error registering user.");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex("users").where({ username }).first();

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({ id: user.id, username: user.username });
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(400).json("Error logging in.");
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await knex("users").select();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(400).json("Error fetching users.");
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const user = await knex("users").where({ id: req.params.userId }).select();
    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(400).json("Error fetching user.");
  }
});

router.patch("/users/:userId", async (req, res) => {
  try {
    const updatedUser = await knex("users")
      .where({ id: req.params.userId })
      .update(req.body)
      .returning("*");
    if (updatedUser.length) {
      res.json(updatedUser[0]);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(400).json("Error updating user.");
  }
});

router.delete("/users/:userId", async (req, res) => {
  try {
    const deletedCount = await knex("users")
      .where({ id: req.params.userId })
      .del();
    if (deletedCount) {
      res.json({ success: true });
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(400).json("Error deleting user.");
  }
});

module.exports = router;
