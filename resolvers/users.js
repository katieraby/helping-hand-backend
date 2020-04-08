const User = require('../mongo-models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userResolvers = {
  createUser: ({ userInput }) => {
    console.log(userInput);
    return bcrypt
      .hash(userInput.password, 12)
      .then((hashedPassword) => {
        const newUser = new User({
          email: userInput.email,
          name: userInput.name,
          password: hashedPassword,
          postcode: userInput.postcode,
          streetAddress: userInput.streetAddress,
          city: userInput.city,
          distanceToTravel: userInput.distanceToTravel,
          profilePhoto: userInput.profilePhoto,
          userType: userInput.userType,
        });
        return newUser.save();
      })
      .then(({ _doc }) => {
        return { ..._doc, password: null };
      })
      .catch((err) => {
        throw err;
      });
  },
  users: () => {
    return User.find()
      .populate('shoppingListId')
      .then((result) => {
        const output = result.map((user) => {
          return { ...user._doc, password: null };
        });
        return output;
      });
  },
  //login
  userById: ({ id }) => {
    const mongooseID = mongoose.Types.ObjectId(id);
    return User.findById(mongooseID).then((result) => {
      const output = { ...result._doc, password: null };
      return output;
    });
  },
};

module.exports = { userResolvers };
