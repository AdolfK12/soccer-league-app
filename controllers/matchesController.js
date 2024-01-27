const {
  addSingleMatch,
  addMultipleMatches,
  getAllMatches,
  getAllClubs,
} = require("../database/dbQueries");
const { handleError } = require("../helpers/errorHandler");

const getMatches = async (req, res) => {
  try {
    const matches = await getAllMatches();
    const clubs = await getAllClubs();
    res.render("matches", { matches, clubs });
  } catch (err) {
    handleError(err, res);
  }
};

const addMatchSingle = async (req, res) => {
  try {
    const { team1, team2, score1, score2 } = req.body;

    if (await matchExists(team1, team2)) {
      const matches = await getAllMatches();
      const clubs = await getAllClubs();
      return res.render("matches", {
        matches,
        clubs,
        errorMessage: "This match has already been recorded.",
      });
    }

    await addSingleMatch(team1, team2, score1, score2);
    res.redirect("/matches");
  } catch (err) {
    handleError(err, res);
  }
};

const addMatchMultiple = async (req, res) => {
  try {
    const { matches } = req.body;
    await addMultipleMatches(matches);
    const allMatches = await getAllMatches();
    const clubs = await getAllClubs();
    res.render("matches", {
      matches: allMatches,
      clubs,
      message: "Multiple match scores added successfully!",
    });
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getMatches,
  addMatchSingle,
  addMatchMultiple,
};
