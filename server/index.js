require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs } = require("./Schema/TypeDefs");
const { resolvers } = require("./Schema/Resolvers");
const { pool } = require("./models/models");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 7200;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      pool,
    };
  },
});

app.use(cors());

app.get("/user", userRoutes.getUsers);
app.use("/auth", authRoutes);

const start = async () => {
  try {
    await server.start();

    server.applyMiddleware({ app });

    app.get("/", function (req, res) {
      res.send("Hello Ruslan!");
    });

    app.listen(PORT, function (err) {
      if (!err)
        console.log(`Server (Voice_assistant) started on PORT = ${PORT}`);
      else console.log(err);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
