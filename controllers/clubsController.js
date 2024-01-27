const { getAllClubs } = require("../database/dbQueries");
const { handleError } = require("../helpers/errorHandler");

const getClubs = async (req, res) => {
  try {
    const clubs = await getAllClubs();
    res.render("clubs", { clubs });
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getClubs,
};
