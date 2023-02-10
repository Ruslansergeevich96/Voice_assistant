const PORT = process.env.PORT || 5000;

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.get("/", function (req, res) {
      res.send("Hello Ruslan!");
    });

    app.listen(PORT, function (err) {
      if (!err)
        console.log(`Crypto Server (cryptoforest) started on PORT = ${PORT}`);
      else console.log(err);
    });
  } catch (e) {
    console.log(e);
  }
};
