const db = require("./database");

const getAllClubs = async () => {
  try {
    return await db.query("SELECT * FROM clubs");
  } catch (error) {
    throw error;
  }
};

const addClub = async (name, city) => {
  try {
    const sql = "INSERT INTO clubs (name, city) VALUES (?, ?)";
    await db.query(sql, [name, city]);
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

const addSingleMatch = async (team1, team2, score1, score2) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const sql =
      "INSERT INTO matches (club1_id, club2_id, score1, score2, date) VALUES (?, ?, ?, ?, ?)";
    await db.query(sql, [team1, team2, score1, score2, date]);
  } catch (error) {
    throw error;
  }
};

const addMultipleMatches = async (matches) => {
  try {
    const sql =
      "INSERT INTO matches (club1_id, club2_id, score1, score2, date) VALUES (?, ?, ?, ?, ?)";
    const date = new Date().toISOString().split("T")[0];
    for (let match of matches) {
      await db.query(sql, [
        match.team1,
        match.team2,
        match.score1,
        match.score2,
        date,
      ]);
    }
  } catch (error) {
    throw error;
  }
};

const getStandings = async () => {
  try {
    return await db.query(
      "SELECT * FROM standings ORDER BY points DESC, goals_for DESC, goals_against ASC"
    );
  } catch (error) {
    throw error;
  }
};

const matchExists = async (team1, team2) => {
  const sql = `
    SELECT * FROM matches
    WHERE (club1_id = ? AND club2_id = ?) OR (club1_id = ? AND club2_id = ?)
  `;
  const matches = await db.query(sql, [team1, team2, team2, team1]);
  return matches.length > 0;
};

module.exports = {
  getAllClubs,
  addClub,
  getAllMatches,
  addSingleMatch,
  addMultipleMatches,
  getStandings,
  matchExists,
};
