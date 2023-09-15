const express = require("express");
const router = express.Router();
const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

router.post("/", async (req, res) => {
  try {
    const newInterest = await knex("interests").insert(req.body).returning("*");
    res.status(201).json(newInterest[0]);
  } catch (err) {
    console.error("Error creating interest:", err.message);
    res.status(400).json("Error creating interest.");
  }
});

router.get("/", async (req, res) => {
  try {
    const interests = await knex("interests").select();
    res.json(interests);
  } catch (err) {
    console.error("Error fetching interests:", err.message);
    res.status(400).json("Error fetching interests.");
  }
});

router.get("/:interestId", async (req, res) => {
  try {
    const interest = await knex("interests")
      .where({ id: req.params.interestId })
      .first();
    if (interest) {
      res.json(interest);
    } else {
      res.status(404).json("Interest not found");
    }
  } catch (err) {
    console.error("Error fetching interest:", err.message);
    res.status(400).json("Error fetching interest.");
  }
});

router.patch("/:interestId", async (req, res) => {
  try {
    const updatedInterest = await knex("interests")
      .where({ id: req.params.interestId })
      .update(req.body)
      .returning("*");
    if (updatedInterest.length) {
      res.json(updatedInterest[0]);
    } else {
      res.status(404).json("Interest not found");
    }
  } catch (err) {
    console.error("Error updating interest:", err.message);
    res.status(400).json("Error updating interest.");
  }
});

router.delete("/:interestId", async (req, res) => {
  try {
    const deletedCount = await knex("interests")
      .where({ id: req.params.interestId })
      .del();
    if (deletedCount) {
      res.json({ success: true });
    } else {
      res.status(404).json("Interest not found");
    }
  } catch (err) {
    console.error("Error deleting interest:", err.message);
    res.status(400).json("Error deleting interest.");
  }
});

module.exports = router;
