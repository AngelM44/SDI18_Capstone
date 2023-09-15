const express = require("express");
const router = express.Router();
const knex = require("knex")(
  require("../knexfile.js")[process.env.NODE_ENV || "development"]
);

router.post("/", async (req, res) => {
  try {
    const newPost = await knex("posts").insert(req.body).returning("*");
    res.status(201).json(newPost[0]);
  } catch (err) {
    console.error("Error creating post:", err.message);
    res.status(400).json("Error creating post.");
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await knex("posts").select();
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(400).json("Error fetching posts.");
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await knex("posts").where({ id: req.params.postId }).first();
    if (post) {
      res.json(post);
    } else {
      res.status(404).json("Post not found");
    }
  } catch (err) {
    console.error("Error fetching post:", err.message);
    res.status(400).json("Error fetching post.");
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await knex("posts")
      .where({ id: req.params.postId })
      .update(req.body)
      .returning("*");
    if (updatedPost.length) {
      res.json(updatedPost[0]);
    } else {
      res.status(404).json("Post not found");
    }
  } catch (err) {
    console.error("Error updating post:", err.message);
    res.status(400).json("Error updating post.");
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const deletedCount = await knex("posts")
      .where({ id: req.params.postId })
      .del();
    if (deletedCount) {
      res.json({ success: true });
    } else {
      res.status(404).json("Post not found");
    }
  } catch (err) {
    console.error("Error deleting post:", err.message);
    res.status(400).json("Error deleting post.");
  }
});

module.exports = router;
