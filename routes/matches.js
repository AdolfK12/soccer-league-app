const express = require("express");
const router = express.Router();
const matchesController = require("../controllers/matchesController");

router.get("/", matchesController.getMatches);

router.post("/single", matchesController.addMatchSingle);
router.post("/multiple", matchesController.addMatchMultiple);

module.exports = router;
