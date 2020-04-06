const express = require("express");
const graphqlHTTP = require("express-graphql");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: require("./schema.js"),
    rootValue: require("./resolvers/volunteers.js"),
    graphiql: true,
  })
);

module.exports = { app };
