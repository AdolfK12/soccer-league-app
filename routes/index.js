const express = require("express");
const router = express.Router();
const clubsRouter = require("./clubs");
const matchesRouter = require("./matches");
const { getStandings } = require("../database/dbQueries");

router.get("/", async (req, res) => {
  try {
    const standings = await getStandings();
    res.render("index", { standings });
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
});

router.use("/clubs", clubsRouter);
router.use("/matches", matchesRouter);

module.exports = router;
