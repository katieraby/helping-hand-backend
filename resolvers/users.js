const User = require("../mongo-models/users");

const userResolvers = {
  createUser: ({ userInput }) => {
    const newUser = new User({
      email: userInput.email,
      name: userInput.name,
      password: userInput.password,
      location: userInput.location,
      distanceToTravel: userInput.distanceToTravel,
      profilePhoto: userInput.profilePhoto,
    });
    return newUser.save().then(({ _doc }) => {
      return { ..._doc };
    });
  },
  users: () => {
    return User.find().then((result) => {
      const output = result.map((user) => {
        return { ...user._doc, password: "null" };
      });
      return output;
    });
  },
};

module.exports = { userResolvers };
