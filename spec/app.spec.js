process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const chai = require("chai");

const expect = chai.expect;
const url = `http://localhost:8080`;
const request = require("supertest")(url);
const databaseName = "test";

describe("GraphQL", () => {
  it("successfully adds new user", () => {
    request
      .post("/graphql")
      .send({
        query:
          'mutation {createUser(userInput: {name:"test name", email:"test email", password:"test password", location:"test location", distanceToTravel: 3, profilePhoto:"test photo"}){name, email, password, location, distanceToTravel, profilePhoto}}',
      })
      .expect(200)
      .then(({ body }) => {
        const { createUser } = body.data;
        expect(createUser).to.have.all.keys([
          "name",
          "email",
          "password",
          "location",
          "distanceToTravel",
          "profilePhoto",
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
