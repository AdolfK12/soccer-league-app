const express = require("express");
const router = express.Router();
const clubsController = require("../controllers/clubsController");

router.get("/", clubsController.getClubs);
router.post("/", clubsController.addNewClub);

module.exports = router;
