const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
let mongoUsername, mongoPassword;
if (!process.env.MONGODB_USERNAME && !process.env.MONGODB_PASSWORD) {
  const dbConfig = require('./config');
  mongoUsername = dbConfig.mongoUsername;
  mongoPassword = dbConfig.mongoPassword;
} else {
  mongoUsername = process.env.MONGODB_USERNAME;
  mongoPassword = process.env.MONGODB_PASSWORD;
}
// const { mongoUsername, mongoPassword } = require('./config');
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
app.use(cors());
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
