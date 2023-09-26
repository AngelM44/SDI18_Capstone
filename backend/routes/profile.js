const express = require("express");
const router = express.Router();
const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

// router.post("/", async (req, res) => {
//   const { user_id, availability, info, goals } = req.body;
//   try {
//     const newProfile = await knex("profile")
//       .insert({
//         user_id,
//         availability,
//         info,
//         goals,
//       })
//       .returning("*");
//     res.status(201).json(newProfile[0]);
//   } catch (err) {
//     console.error("Error creating profile:", err.message);
//     res.status(400).json("Error creating profile.");
//   }
// });

router.post("/", async (req, res) => {
  const { profile_id, date_created, body, first_name, last_name } = req.body;

  try {
    const newPost = await knex("posts")
      .insert({
        profile_id,
        date_created,
        body,
      })
      .returning("*");

    const updatedProfile = await knex("profile")
      .where({ user_id: profile_id })
      .update({})
      .returning("*");

    if (newPost[0] && updatedProfile[0]) {
      res.status(201).json({
        newPost: {
          id: newPost[0].id,
          profile_id: newPost[0].profile_id,
          date_created: newPost[0].date_created,
          body: newPost[0].body,
          first_name,
          last_name,
        },
        updatedProfile: updatedProfile[0],
      });
    } else {
      res.status(400).json("Error creating post or updating profile.");
    }
  } catch (err) {
    console.error("Error creating post and updating profile:", err.message);
    res.status(400).json("Error creating post and updating profile.");
  }
});

router.get("/:profileId", async (req, res) => {
  try {
    const profile = await knex
      .select("*")
      .from("profile AS p")
      .leftJoin("users AS u", "p.user_id", "u.id")
      .leftJoin("posts", "posts.profile_id", "p.id")
      // .leftJoin("user_interests AS ui", "ui.user_id", "u.id")
      .where("u.id", "=", req.params.profileId)
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

router.get("/", async (req, res) => {
  try {
    const profiles = await knex("profile").select();
    res.json(profiles);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(400).json("Error fetching profiles.");
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
