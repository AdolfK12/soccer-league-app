const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "data.db");

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Connection error: " + err.message);
  } else {
    console.log("Successfully connected to the SQLite database.");
  }
});

const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        console.error("Query error: " + err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  query,
};
