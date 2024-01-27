const {
  addSingleMatch,
  addMultipleMatches,
  getAllMatches,
  getAllClubs,
  matchExists,
} = require("../database/dbQueries");
const { handleError } = require("../helpers/errorHandler");

const getMatches = async (req, res) => {
  try {
    const matches = await getAllMatches();
    const clubs = await getAllClubs();
    res.render("matches", { matches, clubs, errorMessage: null });
  } catch (err) {
    handleError(err, res);
  }
};

const addMatchSingle = async (req, res) => {
  try {
    const { team1, team2, score1, score2 } = req.body;

    // Check if both teams are selected
    if (!team1 || !team2) {
      const matches = await getAllMatches();
      const clubs = await getAllClubs();
      return res.render("matches", {
        matches,
        clubs,
        errorMessage: "Please select both teams.",
      });
    }

    // Check if the match already exists
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
    for (const match of matches) {
      // Check if both teams are selected for each match
      if (!match.team1 || !match.team2) {
        const allMatches = await getAllMatches();
        const clubs = await getAllClubs();
        return res.render("matches", {
          matches: allMatches,
          clubs,
          errorMessage: "Please select both teams for all matches.",
        });
      }

      // Check if the match already exists for each match
      if (await matchExists(match.team1, match.team2)) {
        const allMatches = await getAllMatches();
        const clubs = await getAllClubs();
        return res.render("matches", {
          matches: allMatches,
          clubs,
          errorMessage: "One or more matches have already been recorded.",
        });
      }
    }

    await addMultipleMatches(matches);
    res.redirect("/matches");
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getMatches,
  addMatchSingle,
  addMatchMultiple,
};
