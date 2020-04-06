const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const { mongoUsername, mongoPassword } = require('./config');
const { volunteerResolvers } = require('./resolvers/volunteers');

const mongoose = require('mongoose');
const app = express();

mongoose.connect(
  `mongodb+srv://${mongoUsername}:${mongoPassword}@helping-hand-mkn5x.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use(bodyParser.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: require('./schema.js'),
    rootValue: volunteerResolvers,
    graphiql: true,
  })
);

module.exports = { app };
