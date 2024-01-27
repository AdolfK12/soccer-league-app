const { getAllClubs, addClub } = require("../database/dbQueries");
const { handleError } = require("../helpers/errorHandler");

const getClubs = async (req, res) => {
  try {
    const clubs = await getAllClubs();
    res.render("clubs", { clubs });
  } catch (err) {
    handleError(err, res);
  }
};

const addNewClub = async (req, res) => {
  try {
    const { name, city } = req.body;
    const lowerCaseName = name.toLowerCase();

    const clubs = await getAllClubs();
    const clubExists = clubs.some(
      (club) => club.name.toLowerCase() === lowerCaseName
    );

    if (clubExists) {
      res.render("clubs", {
        clubs,
        errorMessage: "Club with the same name already exists.",
      });
    } else {
      await addClub(name, city);
      res.redirect("/clubs");
    }
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getClubs,
  addNewClub,
};
