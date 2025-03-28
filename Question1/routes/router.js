const express = require("express");
const router = express.Router();
const postController = require("../controllers/postsController");

router.get("/users", postController.getPosts);


module.exports = router;