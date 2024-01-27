const handleError = (error, res) => {
  console.error(error);
  res.status(500).send("Server Error: " + error.message);
};

module.exports = {
  handleError,
};
