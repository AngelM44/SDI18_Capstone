const express = require("express");
const router = express.Router();
const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

router.post("/", async (req, res) => {
  const { user_id, availability, info, goals } = req.body;
  try {
    const newProfile = await knex("profile")
      .insert({
        user_id,
        availability,
        info,
        goals,
      })
      .returning("*");
    res.status(201).json(newProfile[0]);
  } catch (err) {
    console.error("Error creating profile:", err.message);
    res.status(400).json("Error creating profile.");
  }
});

router.get("/:profileId", async (req, res) => {
  try {
    const profile = await knex("profile")
      .where({ id: req.params.profileId })
      .first();
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json("Profile not found");
    }
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(400).json("Error fetching profile.");
  }
});

router.patch("/:profileId", async (req, res) => {
  try {
    const updatedProfile = await knex("profile")
      .where({ id: req.params.profileId })
      .update(req.body)
      .returning("*");
    if (updatedProfile.length) {
      res.json(updatedProfile[0]);
    } else {
      res.status(404).json("Profile not found");
    }
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(400).json("Error updating profile.");
  }
});

router.delete("/:profileId", async (req, res) => {
  try {
    const deletedCount = await knex("profile")
      .where({ id: req.params.profileId })
      .del();
    if (deletedCount) {
      res.json({ success: true });
    } else {
      res.status(404).json("Profile not found");
    }
  } catch (err) {
    console.error("Error deleting profile:", err.message);
    res.status(400).json("Error deleting profile.");
  }
});

module.exports = router;
