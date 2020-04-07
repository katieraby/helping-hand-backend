const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    postcode: String!
    streetAddress: String
    city: String
    distanceToTravel: Int!
    profilePhoto: String!
    ShoppingListId: [ShoppingList!]
  }

  type ShoppingList {
    _id: ID!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    postcode: String!
    streetAddress: String
    city: String
    distanceToTravel: Int!
    profilePhoto: String!
  }

  type RootQuery {
    users: [User!]
  }

  type RootMutation {
      createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
