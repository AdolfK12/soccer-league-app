const express = require("express");
const router = express.Router();
const clubsController = require("../controllers/clubsController");

router.get("/", clubsController.getClubs);

module.exports = router;
