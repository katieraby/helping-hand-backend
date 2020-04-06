const { buildSchema } = require('graphql');

// ShoppingListId: [ShoppingList!]

const schema = buildSchema(`
  type Volunteer {
    _id: ID!
    name: String!
    email: String!
    password: String!
    location: String!
    distanceToTravel: Int!
    profilePhoto: String!
  }

  input VolunteerInput {
    name: String!
    email: String!
    password: String!
    location: String!
    distanceToTravel: Int!
    profilePhoto: String!
  }

  type RootQuery {
    volunteers: [Volunteer!]
  }

  type RootMutation {
      createVolunteer(volunteerInput: VolunteerInput): Volunteer
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = schema;
