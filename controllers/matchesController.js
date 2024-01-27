const { getAllMatches } = require("../database/dbQueries");
const { handleError } = require("../helpers/errorHandler");

const getMatches = async (req, res) => {
  try {
    const matches = await getAllMatches();
    res.render("matches", { matches });
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getMatches,
};
