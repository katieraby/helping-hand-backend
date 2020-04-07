// example code from Jonny

// const mongoose = require('mongoose');
// const { Owner, Animal } = require('../models');
// const { sample } = require('lodash')

// const seedDb = (ownerData, animalData) => {
//   return mongoose.connection.dropDatabase()
//     .then(() => {
//       return Owner.insertMany(ownerData)
//     })
//     .then(ownerDocs => {
//       const newAnimals = animalData.map(animal => {
//         let ownerId = Math.random() < 0.5 ? null : sample(ownerDocs)._id
//         return {
//           ...animal,
//           ownerId
//         }
//       })
//       return Animal.insertMany(newAnimals)
//     })
// }

// module.exports = seedDb;

process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const chai = require("chai");

const expect = chai.expect;
const url = `http://localhost:8080`;
const request = require("supertest")(url);
const databaseName = "test";

// const clearDatabase = async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     const collection = collections[key];
//     await collection.deleteMany();
//   }
// };

// before(async () => {
//   const mongoURL = `mongodb://localhost:27017/test`;
//   await mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// afterEach(async () => await clearDatabase());

describe("User Resolvers", () => {
  it("POST - Successfully adds new user", () => {
    return request
      .post("/graphql")
      .send({
        query:
          'mutation {createUser(userInput: { name: "test", email:"test email", password:"test password", postcode:"test postcode", distanceToTravel: 3, profilePhoto:"test photo"}){name, email, password, postcode, distanceToTravel, profilePhoto}}',
      })
      .expect(200)
      .then(({ body }) => {
        const { createUser } = body.data;
        expect(createUser).to.have.all.keys([
          "name",
          "email",
          "password",
          "postcode",
          "distanceToTravel",
          "profilePhoto",
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it("POST returns status 400 when no name is provided", () => {
    return request
      .post("/graphql")
      .send({
        query:
          'mutation {createUser(userInput: { email:"test email"}){ email }',
      })
      .expect(400);
  });

  it("GET: 200 - successfully returns all users", () => {
    return request
      .post("/graphql")
      .send({
        query:
          "query { users {_id, name, email, postcode, password, streetAddress, city, distanceToTravel, profilePhoto, ShoppingListId {_id}}}",
      })
      .expect(200)
      .then(({ body }) => {
        const { users } = body.data;
        expect(users[0]).to.have.all.keys([
          "_id",
          "name",
          "email",
          "postcode",
          "password",
          "streetAddress",
          "city",
          "distanceToTravel",
          "profilePhoto",
          "ShoppingListId",
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe("ShoppingList Resolvers", () => {
  it("POST - Successfully adds new shopping list", () => {
    return request
      .post("/graphql")
      .send({
        query:
          'mutation {createShoppingList(shoppingListInput: {helpee: "5e8c5e343c6852bcb9a41058", listImage: "imageurl", listText: "bread, milk"}) {_id, orderStatus, helpee {name}, volunteer {name}, listImage, listText, createdAt, updatedAt}}',
      })
      .expect(200)
      .then(({ body }) => {
        console.log("test >>>>", body);
      })
      .catch((err) => {
        console.dir(err);
      });
  });
});
