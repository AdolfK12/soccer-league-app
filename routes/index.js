const express = require("express");
const router = express.Router();
const clubsRouter = require("./clubs");
const matchesRouter = require("./matches");

router.get("/", (req, res) => {
  res.render("index");
});

router.use("/clubs", clubsRouter);
router.use("/matches", matchesRouter);

module.exports = router;
