const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.use((req, res, next) => {
  res.status(404).send("Sorry, the page was not found!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
