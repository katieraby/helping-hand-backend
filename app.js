const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const { mongoUsername, mongoPassword } = require('./config');
const { rootResolver } = require('./resolvers/index');

const mongoose = require('mongoose');
const app = express();

const { handleCustomErrors, handle500Errors } = require('./errors');

let mongoURL = '';

if (process.env.NODE_ENV === 'test') {
  mongoURL = `mongodb://localhost:27017/test`;
} else {
  mongoURL = `mongodb+srv://${mongoUsername}:${mongoPassword}@helping-hand-mkn5x.mongodb.net/helping-hand?retryWrites=true&w=majority`;
}

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use(bodyParser.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: require('./schema.js'),
    rootValue: rootResolver,
    graphiql: true,
  })
);

app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = { app };
