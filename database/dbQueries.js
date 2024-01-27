const db = require("./database");

const getAllClubs = async () => {
  try {
    return await db.query("SELECT * FROM clubs");
  } catch (error) {
    throw error;
  }
};

const getAllMatches = async () => {
  try {
    return await db.query(`
      SELECT m.id, m.date, c1.name as team1, c2.name as team2, m.score1, m.score2
      FROM matches m
      JOIN clubs c1 ON m.club1_id = c1.id
      JOIN clubs c2 ON m.club2_id = c2.id
    `);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllClubs,
  getAllMatches,
};
