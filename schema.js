const { buildSchema } = require("graphql");

// ShoppingListId: [ShoppingList!]

const schema = buildSchema(`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    location: String!
    distanceToTravel: Int!
    profilePhoto: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    location: String!
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
