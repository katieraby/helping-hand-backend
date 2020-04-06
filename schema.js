const { buildSchema } = require("graphql");

const schema = buildSchema(gql`
  type Volunteer {
    _id: ID!
    name: String!
    email: String!
    password: String!
    location: String!
    distanceToTravel: Number!
    profilePhoto: String!
    ShoppingListId: [ShoppingList!]
  }

  input VolunteerInput {
    name: String!
    email: String!
    password: String!
    location: String!
    distanceToTravel: Number!
    profilePhoto: String!
  }

  type RootQuery {

  }

  type RootMutation {
      createVolunteer(volunteerInput: VolunteerInput): Volunteer
  }
`);

module.exports = schema;
