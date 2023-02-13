const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send("Что-то не работает, попробуй позже.");
};

module.exports = errorHandler;
