const express = require("express");
const router = express.Router();
const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

router.get("/", async (req, res) => {
  try {
    const userInterest = await knex("user_interests").select();
    res.json(userInterest);
  } catch (err) {
    console.error("Error fetching user interest:", err.message);
    res.status(400).json("Error fetching user interest.");
  }
});

router.get("/:userInterestId", async (req, res) => {
  try {
    const userInterest = await knex("user_interests")
      .where({ id: req.params.userInterestId })
      .first();
    if (userInterest) {
      res.json(userInterest);
    } else {
      res.status(404).json("User interest not found");
    }
  } catch (err) {
    console.error("Error fetching user interest:", err.message);
    res.status(400).json("Error fetching user interest.");
  }
});

router.post("/", async (req, res) => {
  try {
    const newUserInterest = await knex("user_interests")
      .insert(req.body)
      .returning("*");
    res.json(newUserInterest[0]);
  } catch (err) {
    console.error("Error adding user interest:", err.message);
    res.status(400).json("Error adding user interest.");
  }
});

router.patch("/:userInterestId", async (req, res) => {
  try {
    const updatedUserInterest = await knex("user_interests")
      .where({ id: req.params.userInterestId })
      .update(req.body)
      .returning("*");
    if (updatedUserInterest.length) {
      res.json(updatedUserInterest[0]);
    } else {
      res.status(404).json("User interest not found");
    }
  } catch (err) {
    console.error("Error updating user interest:", err.message);
    res.status(400).json("Error updating user interest.");
  }
});

router.delete("/:userInterestId", async (req, res) => {
  try {
    const deletedCount = await knex("user_interests")
      .where({ id: req.params.userInterestId })
      .del();
    if (deletedCount) {
      res.json({ success: true });
    } else {
      res.status(404).json("User interest not found");
    }
  } catch (err) {
    console.error("Error deleting user interest:", err.message);
    res.status(400).json("Error deleting user interest.");
  }
});

module.exports = router;
