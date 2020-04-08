const User = require("../mongo-models/users");
const bcrypt = require("bcryptjs");

const userResolvers = {
  createUser: ({ userInput }) => {
    return bcrypt
      .hash(userInput.password, 12)
      .then((hashedPassword) => {
        const newUser = new User({
          email: userInput.email,
          name: userInput.name,
          password: hashedPassword,
          postcode: userInput.postcode,
          distanceToTravel: userInput.distanceToTravel,
          profilePhoto: userInput.profilePhoto,
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
      .populate("shoppingListId")
      .then((result) => {
        const output = result.map((user) => {
          return { ...user._doc, password: null };
        });
        return output;
      });
  },
  //login
};

module.exports = { userResolvers };
