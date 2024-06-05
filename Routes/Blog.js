  const express = require("express");
  const cors = require("cors");

  const Blog = require("../database/Models/BlogSchema");

  const router = express.Router();
  router.use(cors());

  router.post("/", async (req, res) => {
    const { img, title, overview, details } = req.body;

    if (!img || !title || !overview || !details) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const blogDetails = details.map(({ sectionTitle, sectionContent }) => ({
      sectionTitle,
      sectionContent,
    }));


    const blogPost = new Blog({
      img,
      title,
      overview,
      details: blogDetails,
    });

    try {
      const blogs = await blogPost.save();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const savedBlog = await Blog.find();
      res.status(200).json(savedBlog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;
